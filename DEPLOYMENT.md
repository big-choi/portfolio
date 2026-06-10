# 배포 · 도메인 · 보안 가이드

이 문서는 포트폴리오(Next.js)를 `boseongchoi.com` 도메인으로 호스팅하고, CDN/HTTPS/보안을 적용하기 위한 안내입니다.

- **이미 코드로 적용된 것**: 보안 헤더(CSP·HSTS 등), 도메인 메타데이터(`metadataBase`), `sitemap.xml`, `robots.txt`
- **직접 하셔야 하는 것**: Vercel 배포, 가비아 DNS 설정, (선택) Cloudflare 보안 강화, Google Search Console 등록

---

## 0. 권장 아키텍처


| 항목        | 권장 방식                        | 비고                           |
| --------- | ---------------------------- | ---------------------------- |
| 호스팅       | **Vercel**                   | Next.js 제작사. 설정 거의 없음, 무료 플랜 |
| CDN       | Vercel Edge Network (기본 제공)  | 전 세계 엣지 캐싱 자동                |
| HTTPS/TLS | Vercel 자동 발급 (Let's Encrypt) | 인증서 자동 갱신                    |
| CI/CD     | GitHub 연동 (push 시 자동 배포)     | `main` 브랜치 푸시 → 자동 빌드/배포     |
| 보안 헤더     | 코드(`next.config.ts`)로 적용 완료  | CSP·HSTS·X-Frame-Options 등   |
| 추가 보안     | (선택) **Cloudflare** WAF/DDoS | 더 강한 방화벽·봇 차단이 필요할 때         |


> Vercel만으로도 **CDN + 자동 HTTPS + 기본 DDoS 완화**가 모두 충족됩니다.
> Cloudflare(섹션 4)는 WAF·봇 차단 등 보안을 한 단계 더 강화하고 싶을 때의 **선택 사항**입니다.

> 참고: 이 사이트는 전부 정적(SSG)이라 Cloudflare Pages 같은 정적 호스팅으로도 배포 가능하지만,
> Next.js 호환성·설정 편의성 면에서 **Vercel을 우선 권장**합니다.

---

## 1. (내가 할 일) Vercel 배포

1. [vercel.com](https://vercel.com) 접속 → **GitHub 계정으로 가입/로그인** (`big-choi` 계정)
2. 대시보드 → **Add New… → Project**
3. `big-choi/portfolio` 저장소 선택 → **Import**
4. 설정 화면에서 별도 수정 없이 진행
  - Framework Preset: **Next.js** (자동 인식)
  - Build Command / Output: 기본값 그대로
5. **Deploy** 클릭 → 1~2분 후 `xxxx.vercel.app` 임시 주소로 사이트가 뜨면 성공

이후 `main` 브랜치에 push할 때마다 자동으로 재배포됩니다.

---

## 2. (내가 할 일) 가비아 도메인 연결

### 2-1. Vercel에 도메인 추가

1. Vercel 프로젝트 → **Settings → Domains**
2. `boseongchoi.com` 입력 → **Add**
3. `www.boseongchoi.com`도 추가 (자동으로 apex로 리다이렉트 설정 권장)
4. Vercel이 화면에 **설정해야 할 DNS 레코드 값**을 보여줍니다.
  아래 2-2의 값과 다르면 **Vercel 화면에 표시된 값을 우선**하세요.

### 2-2. 가비아 DNS 레코드 설정

1. [가비아](https://www.gabia.com) 로그인 → **My가비아 → DNS 관리툴**
2. `boseongchoi.com` 선택 → **DNS 설정 / 레코드 수정**
3. 아래 레코드를 추가합니다.


| 타입    | 호스트   | 값 / 위치                  | TTL |
| ----- | ----- | ----------------------- | --- |
| A     | `@`   | `76.76.21.21`           | 600 |
| CNAME | `www` | `cname.vercel-dns.com.` | 600 |


> - `@`는 apex(루트) 도메인 `boseongchoi.com`을 의미합니다.
> - 값 끝의 마침표(`.`)는 가비아 입력 형식에 따라 생략될 수 있습니다.
> - **Vercel 화면이 다른 IP/값을 안내하면 그 값을 사용하세요.** (Vercel IP가 바뀔 수 있음)

1. 저장 후 **DNS 전파**를 기다립니다 (보통 수 분 ~ 최대 24~48시간).
2. Vercel **Domains** 화면에서 상태가 **Valid / Active**로 바뀌면 완료.

### 2-3. HTTPS

- 도메인 검증이 끝나면 Vercel이 **TLS 인증서를 자동 발급/갱신**합니다.
- 별도 작업 불필요. `https://boseongchoi.com` 접속 시 자물쇠 표시 확인.

---

## 3. (확인) 적용된 보안 헤더

`next.config.ts`에 아래 헤더가 모든 응답에 적용되도록 코드로 추가해 두었습니다.


| 헤더                          | 역할                           |
| --------------------------- | ---------------------------- |
| `Content-Security-Policy`   | XSS·리소스 출처 제한 (기본 `self`)    |
| `Strict-Transport-Security` | HTTPS 강제 (HSTS, 2년, preload) |
| `X-Content-Type-Options`    | MIME 스니핑 차단                  |
| `X-Frame-Options: DENY`     | 클릭재킹(iframe 삽입) 차단           |
| `Referrer-Policy`           | 외부로 전송되는 referrer 정보 최소화     |
| `Permissions-Policy`        | 카메라·마이크·위치 등 권한 차단           |


**배포 후 확인 방법**

- [securityheaders.com](https://securityheaders.com) 에 `https://boseongchoi.com` 입력 → **A 등급** 목표
- 외부 스크립트(예: 분석 도구, 임베드)를 새로 추가하면 CSP에 막힐 수 있습니다.
그럴 땐 `next.config.ts`의 `contentSecurityPolicy` 배열에 해당 출처를 추가하세요.

> (선택) HSTS preload 목록 등록: 도메인이 안정적으로 HTTPS로 동작하는 것을 확인한 뒤
> [hstspreload.org](https://hstspreload.org) 에서 제출하면 브라우저가 최초 접속부터 HTTPS를 강제합니다.

---

## 4. (선택) Cloudflare로 보안 강화

WAF(웹 방화벽)·봇 차단·더 강한 DDoS 방어가 필요하면 Cloudflare를 도메인 앞단에 둡니다.
**Vercel 기본 보안으로 충분하다면 이 섹션은 건너뛰어도 됩니다.**

1. [Cloudflare](https://dash.cloudflare.com) 가입 → **Add a site** → `boseongchoi.com`
2. 무료(Free) 플랜 선택 → Cloudflare가 기존 DNS 레코드를 가져옵니다.
3. Cloudflare가 안내하는 **네임서버 2개**를 복사
4. 가비아 → **My가비아 → 도메인 관리 → 네임서버 설정**에서 Cloudflare 네임서버로 **변경**
  - 이 경우 DNS 관리 주체가 가비아 → Cloudflare로 넘어갑니다. (DNS 레코드도 Cloudflare에서 관리)
5. Cloudflare DNS에서 섹션 2-2의 레코드를 동일하게 추가하고 **Proxy 상태(주황색 구름) ON**
6. **SSL/TLS → Overview → 모드를 `Full (strict)`** 로 설정 (중요: 리다이렉트 루프 방지)
7. 권장 보안 설정
  - **Security → WAF**: Managed Rules 활성화
  - **SSL/TLS → Edge Certificates**: Always Use HTTPS ON, Automatic HTTPS Rewrites ON
  - **Security → Bots**: Bot Fight Mode ON (무료)

> 주의: Cloudflare를 Vercel 앞에 둘 때는 **SSL 모드를 반드시 `Full (strict)`** 로 두세요.
> `Flexible`로 두면 무한 리다이렉트가 발생합니다.

---

## 5. (선택) SEO / 검색 노출

- 코드로 `sitemap.xml`, `robots.txt`가 자동 생성됩니다.
  - 확인: `https://boseongchoi.com/sitemap.xml`, `https://boseongchoi.com/robots.txt`
- [Google Search Console](https://search.google.com/search-console) 에 도메인 등록 →
소유권 확인 후 `https://boseongchoi.com/sitemap.xml` 제출 → 검색 노출 가속화.

---

## 내가 할 일 체크리스트

- [x] Vercel 가입 후 `big-choi/portfolio` 임포트 & 배포 (`*.vercel.app` 확인)
- [x] Vercel Settings → Domains에 `boseongchoi.com`, `www.boseongchoi.com` 추가
- [x] 가비아 DNS 관리툴에서 A / CNAME 레코드 추가 (Vercel 안내값 우선)
- [x] `https://boseongchoi.com` 접속 & 자물쇠(HTTPS) 확인
- [ ] securityheaders.com 에서 등급 확인 (A 목표)
- [ ] (선택) Cloudflare 연동 → SSL `Full (strict)`, WAF/Bot 설정
- [ ] (선택) Google Search Console에 sitemap 제출

---

## 참고: 로컬 빌드 확인

배포 전 로컬에서 프로덕션 빌드가 정상인지 확인하려면:

```bash
npm run build
npm run start
```

