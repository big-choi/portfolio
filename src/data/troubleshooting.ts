import { TroubleshootingCase } from '@/lib/types';

export const onguelTroubleshooting: TroubleshootingCase[] = [
  {
    title: 'MFA 로그인 중 세션 복원과 리다이렉트 가드의 경쟁 조건(Race Condition)',
    body: `### 문제

MFA 코드 입력 화면(\`/login/mfa\`)에서 코드를 입력하기 전에 대시보드의 Skeleton UI가 순간적으로 렌더링되었다가 다시 MFA 화면으로 돌아오는 깜빡임이 발생했습니다. 간헐적으로는 MFA 단계를 건너뛴 채 기본 경로로 리다이렉트되는 케이스도 있었습니다.

### 원인 분석

인증 완료 시 역할별 기본 경로로 보내는 리다이렉트 가드가 \`isAuthenticated\` 값 하나만으로 이동을 판단하고 있었습니다.

\`\`\`tsx
// Before
useEffect(() => {
  if (meta.isAuthenticated) {
    navigate(getDefaultRouteByRole(user?.roleCode, user?.tenantSchema), { replace: true });
  }
}, [meta.isAuthenticated, navigate, user?.roleCode, user?.tenantSchema]);
\`\`\`

문제는 \`localStorage\` 기반 세션 복원과의 타이밍 충돌이었습니다.

1. 로그인 플로우는 \`credentials → mfa → done\` 단계로 진행되며, 사용자는 \`step === 'mfa'\` 상태에서 \`/login/mfa\`에 머물러야 합니다.
2. 이때 세션 복원 로직이 \`isAuthenticated\`를 일시적으로 \`true\`로 전환하는 구간이 존재했습니다.

이 순간 가드가 대시보드로 리다이렉트를 발생시키고, 직후 로그인 플로우가 다시 \`/login/mfa\`로 복귀시키면서 두 내비게이션이 경쟁했습니다. 가드가 인증 여부만 검사할 뿐 로그인 플로우의 현재 단계를 고려하지 않은 것이 근본 원인입니다.

### 해결

리다이렉트 조건에 플로우 단계(\`step\`)를 추가해, MFA 진행 중에는 \`isAuthenticated\`가 \`true\`여도 이동하지 않도록 가드를 보강했습니다. 의존성 배열에도 \`step\`을 포함해 단계 전환 시 가드가 최신 값으로 재평가되도록 했습니다.

\`\`\`tsx
// After — Login.tsx
useEffect(() => {
  // MFA 진행 중(step === 'mfa')에는 세션 복원으로 isAuthenticated가
  // 일시적으로 true가 되어도 리다이렉트하지 않는다.
  if (meta.isAuthenticated && step !== 'mfa') {
    navigate(getDefaultRouteByRole(user?.roleCode, user?.tenantSchema), { replace: true });
  }
}, [meta.isAuthenticated, navigate, step, user?.roleCode, user?.tenantSchema]);
\`\`\`

\`LoginMfa.tsx\`에서도 동일 원인의 조기 리다이렉트 분기를 제거해, MFA 단계에서는 화면 이동 책임을 갖지 않도록 역할을 분리했습니다.

\`\`\`tsx
// LoginMfa.tsx — 제거
- if (meta.isAuthenticated && step !== 'done') {
-   navigate(defaultRoute, { replace: true });
- }
\`\`\`

### 결과

- MFA 화면의 Skeleton 깜빡임과 오동작 리다이렉트가 제거되었습니다.
- 내비게이션 책임이 로그인 플로우 단계 기준으로 명확해져 동일 유형의 충돌이 재발하지 않았습니다.
- 비동기로 일시 변동할 수 있는 상태 값 하나에 의존한 리다이렉트는 경쟁 조건을 유발하므로, 플로우 단계까지 함께 검사해야 한다는 기준을 정립했습니다.`
  },
  {
    title: 'SSE 스트리밍에서 크레딧 부족 에러 코드가 결과 화면에 노출되는 문제',
    body: `### 문제

크레딧이 부족한 상태에서 변환을 요청하면 서버가 스트림 본문에 에러 페이로드를 내려보냅니다.

\`\`\`text
data: {"message":"credit_reserve_failed", ...}
\`\`\`

프론트는 이를 일반 델타 토큰과 동일하게 처리해, 결과 영역에 내부 에러 코드(원문 JSON)가 그대로 렌더링되거나 의미 없는 문구가 표시되었습니다.

### 원인 분석

스트림 파서는 수신한 모든 \`data:\` 라인을 콘텐츠로 간주해 누적·렌더링하는 구조였습니다.

1. **제어 신호와 콘텐츠 미분리**: \`credit_reserve_failed\`는 제어용 에러 메시지지만 일반 콘텐츠와 동일한 경로로 처리되었습니다.
2. **감지 시점이 파이프라인 후단**: 스트림 종료 후 에러를 인지하더라도 이미 잘못된 내용이 화면에 렌더링된 뒤였습니다.

### 해결

전용 에러 타입을 정의하고, 파싱 루프 최전단에서 에러 신호를 조기 감지해 즉시 throw하도록 했습니다.

\`\`\`ts
const CREDIT_RESERVE_FAILED_CODE = 'credit_reserve_failed';

/** 스트리밍 본문에서 크레딧 예약 실패를 만났을 때 던지는 전용 에러 */
export class StreamCreditReserveError extends Error {
  override name = 'StreamCreditReserveError';
  constructor() {
    super('보유 크레딧이 부족하여 변환을 진행할 수 없습니다. 충전 후 다시 시도해 주세요.');
  }
}
\`\`\`

\`\`\`ts
// streaming.ts — 일반 토큰 처리보다 먼저 검사
if (data.startsWith('{')) {
  try {
    const forCreditCheck = JSON.parse(data) as Record<string, unknown>;
    if (forCreditCheck.message === CREDIT_RESERVE_FAILED_CODE) {
      throw new StreamCreditReserveError(); // 콘텐츠로 처리되기 전에 차단
    }
  } catch (e) {
    if (e instanceof StreamCreditReserveError) {
      throw e; // 의도한 에러는 재전파
    }
    // JSON 파싱 실패 등은 무시하고 계속 진행
  }
}
\`\`\`

\`JSON.parse\` 실패 대비용 \`try/catch\`가 의도적으로 던진 에러까지 삼키지 않도록 \`instanceof\` 검사 후 재전파했고, 스트림 전체를 감싸는 외부 \`catch\`에서도 이 에러는 일반 파싱 경고와 구분해 호출부까지 전파시켜 토스트로 안내하도록 했습니다.

\`\`\`ts
} catch (error) {
  if (error instanceof StreamCreditReserveError) {
    logger.warn('[스트리밍] 크레딧 예약 실패', { path: apiPath, phase: 'read_body' });
    throw error; // 일반 네트워크 오류와 구분해 전파
  }
  // ... 그 외 오류 처리
}
\`\`\`

### 결과

- 내부 에러 코드 노출 없이 명확한 안내 문구가 토스트로 표시됩니다.
- 잘못된 콘텐츠가 렌더링되기 전에 차단되어 결과 화면이 깨지지 않습니다.
- 제어 신호와 콘텐츠를 파이프라인 초입에서 분리하고, 커스텀 에러 타입으로 다단계 \`try/catch\`에서 의도한 에러를 식별하는 패턴을 확보해 이후 다른 스트림 에러 처리에도 동일하게 확장 가능해졌습니다.`
  },
  {
    title: 'API 중복 호출 및 운영 빌드의 디버그 로그 노출',
    body: `### 문제

1. **API 중복 호출**: 페이지 전환 시마다 동일한 목록·인증 데이터가 반복 조회되어 네트워크가 낭비되고, 응답 도착 순서에 따라 화면 상태가 불일치할 위험이 있었습니다.
2. **디버그 로그 노출**: \`AuthContext\`, \`SimplificationContext\`, \`ReviewList\` 등에 사용자 ID, 토큰 유무, API 전체 응답을 출력하는 \`console\` 로그가 운영 빌드에 그대로 포함되어 있었습니다.

### 원인 분석

마운트 시 fetch하는 로직이 여러 페이지와 Context에 분산되어 있었습니다. 라우터(wouter)는 페이지 전환 시 언마운트/마운트를 반복하므로, 페이지에 진입할 때마다 동일 데이터 조회가 무조건 재실행되었습니다.

\`\`\`tsx
// Home.tsx (Before) — 페이지 진입 시마다 호출
useEffect(() => {
  loadSavedContents();
}, []);
\`\`\`

동일한 패턴이 여러 화면에 중복되어, 같은 데이터를 여러 주체가 각자 fetch하는 구조였습니다. 디버그 로그 또한 빌드 단계에서 제거되는 장치 없이 그대로 배포되고 있었습니다.

### 해결

**1단계 — 분산 로직 정리**: 중복 호출을 유발하던 마운트 시 fetch 로직과 운영 노출용 \`console\` 로그를 제거했습니다(약 18개 파일, -249/+82 라인).

**2단계 — 서버 상태 레이어 일원화**: 화면별로 제각각 관리하던 서버 상태를 TanStack Query로 이관했습니다. \`use-rev-list-query\`, \`use-statistics-query\`, \`use-conversion-detail-query\` 등 약 20여 개의 쿼리 훅을 도입해 다음을 구조적으로 보장했습니다.

- **요청 중복 제거(dedup)**: 동일 query key의 동시 요청은 네트워크 요청 1회로 수렴
- **캐싱**: 재방문 시 캐시를 즉시 표시하고 필요 시에만 백그라운드 갱신

마운트 시 직접 fetch하는 패턴 자체를 제거해 중복 호출이 발생할 수 없는 구조로 전환했습니다.

### 결과

- 페이지 진입·전환 시 불필요한 반복 요청이 제거되었습니다.
- 동일 데이터를 여러 곳에서 개별 보관하며 발생하던 상태 불일치가 해소되었습니다.
- 운영 빌드에서 사용자 정보·내부 응답의 콘솔 노출이 차단되었습니다.
- 서버 상태 관리가 쿼리 훅으로 표준화되어 신규 화면도 동일 패턴으로 확장 가능해졌습니다.
- 마운트 시 fetch가 분산되면 중복 호출은 필연적이며, 개별 \`useEffect\` 수정이 아닌 전용 데이터 레이어로의 일원화가 근본 해법임을 확인했습니다.`
  }
];
