# Portfolio

Next.js(App Router) + TypeScript + Tailwind CSS 기반의 프론트엔드 포트폴리오 초안입니다.
깔끔하고 심플한 다크 톤 UI에 Hero(통계) → About → Experience(타임라인) → Projects(카드) → Skills(탭) → Contact 구성을 담았습니다.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 스크립트

| 명령              | 설명                       |
| ----------------- | -------------------------- |
| `npm run dev`     | 개발 서버 실행             |
| `npm run build`   | 프로덕션 빌드              |
| `npm run start`   | 빌드 결과 실행             |
| `npm run lint`    | ESLint 검사                |
| `npm run format`  | Prettier 포맷팅            |

## 콘텐츠 수정 방법

모든 텍스트/이력/프로젝트 데이터는 `src/data/` 폴더에 분리되어 있습니다. UI 컴포넌트를 건드리지 않고 아래 파일만 수정하면 내용이 반영됩니다.

| 파일                      | 수정 내용                                         |
| ------------------------- | ------------------------------------------------- |
| `src/data/profile.ts`     | 이름, 직함, 소개 문구, 상단 통계, 연락처, 소셜 링크 |
| `src/data/experience.ts`  | 경력 타임라인 (회사/기간/역할/성과/스택)           |
| `src/data/projects.ts`    | 프로젝트 카드 (제목/기간/설명/스택/링크/featured)   |
| `src/data/skills.ts`      | 스킬 카테고리 탭과 각 스킬 설명                    |
| `src/data/navigation.ts`  | 상단 네비게이션 메뉴 항목                          |

각 데이터의 타입은 `src/lib/types.ts` 에 정의되어 있어, 필드를 추가하거나 바꿀 때 타입을 함께 참고하면 됩니다.

## 테마 색상

다크 톤과 accent 컬러는 `src/app/globals.css` 상단의 CSS 변수(`--background`, `--accent` 등)에서 한 번에 변경할 수 있습니다.

## 폴더 구조

```
src/
├── app/                 # 레이아웃, 페이지, 전역 스타일
├── components/          # 섹션 컴포넌트
│   └── ui/              # 재사용 UI (heading, tag, card, reveal)
├── data/                # 콘텐츠 데이터 (여기만 수정)
└── lib/                 # 타입 정의
```

## 배포

[Vercel](https://vercel.com) 에 그대로 연결하면 바로 배포됩니다.
