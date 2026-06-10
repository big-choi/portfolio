# 트러블슈팅 사례

## 소셜 로그인 이메일 미제공 사용자와 MongoDB unique 인덱스 충돌 (E11000)

**영역**: Backend (Express + Mongoose)

### 문제

카카오 로그인으로 가입하는 두 번째 사용자부터 회원가입이 `E11000 duplicate key error`로 실패했습니다. 첫 가입자는 정상 처리되는데, 이후 가입자는 모두 같은 오류가 발생했습니다.

### 원인 분석

`User` 스키마의 `email` 필드에 `unique: true`가 걸려 있었는데, 카카오 OAuth는 이메일 제공 동의가 **선택 항목**이라 이메일 없이 가입하는 사용자가 존재했습니다.

```js
// Before — User.js
email: {
  type: String,
  required: true,
  unique: true
}
```

MongoDB의 일반 unique 인덱스는 필드가 없는 문서도 `null` 값으로 인덱싱합니다. 즉 이메일이 없는 사용자가 한 명 저장되는 순간 인덱스에 `email: null` 엔트리가 생기고, 두 번째 이메일 미제공 사용자부터는 `null` 끼리의 중복으로 간주되어 저장이 거부된 것입니다.

초기에 임시방편으로 랜덤 이메일을 생성해 넣는 방식을 시도했지만, 실제 이메일이 아닌 더미 데이터가 DB에 쌓이고 이후 "이메일 기준 기존 계정 연동" 로직과 충돌할 수 있어 폐기했습니다.

```js
// 임시방편 (폐기) — 더미 데이터로 unique 제약 회피
email: `${Math.random().toString(36).substring(2, 15)}@example.com`
```

### 해결

`required`를 제거하고 **sparse unique 인덱스**로 전환했습니다. sparse 인덱스는 해당 필드가 존재하는 문서만 인덱싱하므로, 이메일이 없는 사용자는 unique 검사 대상에서 제외됩니다.

```js
// After — User.js
email: {
  type: String,
  unique: true,
  sparse: true
}
```

이후 네이버 로그인에서 "동일 이메일로 다른 플랫폼에 이미 가입된 사용자"가 또 다른 E11000을 유발하는 케이스가 발견되어, DB 에러가 터지기 전에 콜백에서 사전 검사를 추가하고 기존 가입 플랫폼을 안내하도록 했습니다.

```js
// naver/callback — 저장 전에 이메일 중복을 선제 검사
if (!user) {
  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth?error=duplicate_id&provider=${existingUser.socialLogin.provider}`
    )
  }
  // ... 신규 사용자 생성
}
```

### 결과

- 이메일 미제공 소셜 가입자도 정상 가입되며, 더미 데이터 없이 데이터 정합성을 유지했습니다.
- 중복 이메일 가입 시도는 DB 에러가 아닌 "이미 카카오로 가입된 계정입니다" 형태의 안내로 처리되어 UX가 개선되었습니다.
- "선택적 필드 + unique"는 반드시 sparse(또는 partial) 인덱스로 선언해야 한다는 기준과, 제약 위반은 DB 에러로 받기 전에 애플리케이션 레벨에서 선제 검사해 사용자 친화적으로 안내한다는 기준을 정립했습니다.

---

## Access Token 갱신 인터셉터의 무한 재시도 루프

**영역**: Frontend (React + axios)

### 문제

Refresh Token까지 만료된 상태에서 페이지에 접속하면 네트워크 탭에 `/auth/refresh-token` 요청이 무한 반복되고, 비로그인 사용자도 첫 진입 시 불필요한 401 응답과 콘솔 에러가 발생했습니다.

### 원인 분석

axios 응답 인터셉터에서 401을 감지하면 `/auth/refresh-token`을 호출해 토큰을 갱신하고 원래 요청을 재시도하는 구조였습니다. 문제는 두 가지였습니다.

1. **갱신 요청 자체가 다시 인터셉터에 잡히는 구조**: refresh 요청이 401로 실패하면 그 응답도 같은 인터셉터를 타고, 다시 refresh를 호출하면서 루프가 발생할 수 있었습니다. 또한 갱신 요청에 만료된 Access Token이 `Authorization` 헤더로 첨부되는 문제도 있었습니다.
2. **앱 부팅 시 무조건 갱신 시도**: 로그인 이력이 없는 사용자도 앱 초기화 시점에 `/auth/refresh-token`을 호출해 의미 없는 401이 발생했습니다.

```jsx
// Before — App.jsx: 로그인 여부와 무관하게 항상 호출
useEffect(() => {
  const initializeAuth = async () => {
    try {
      const response = await apiClient.post('/auth/refresh-token')
      dispatch(setAuth(response.data.accessToken))
      // ...
    } catch (error) {
      dispatch(logout())
    }
  }
  initializeAuth()
}, [dispatch])
```

### 해결

인터셉터에 **재시도 플래그(`_retry`)와 갱신 요청 제외 조건**을 최전단에 두고, 갱신 요청에는 `skipAuthInterceptor` 커스텀 설정으로 만료 토큰이 첨부되지 않도록 했습니다.

```js
// After — src/api/axios.js
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 이미 재시도한 요청이거나, refresh 요청 자체는 인터셉터가 처리하지 않음
    if (originalRequest._retry || originalRequest.url.includes('/auth/refresh-token')) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      originalRequest._retry = true
      try {
        const refreshResponse = await apiClient.post(
          '/auth/refresh-token',
          {},
          { skipAuthInterceptor: true } // 만료된 Access Token을 첨부하지 않음
        )
        store.dispatch(setAuth(refreshResponse.data.accessToken))
        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        store.dispatch(logout()) // 갱신 실패 시에만 로그아웃
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
```

```js
// 요청 인터셉터 — skipAuthInterceptor 설정 시 토큰 미첨부
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (!config.skipAuthInterceptor && token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
```

앱 부팅 로직도 인증 상태가 있을 때만 세션 복원을 시도하도록 조건을 추가했습니다.

```jsx
// After — App.jsx
const initializeAuth = async () => {
  if (isAuthenticated) {
    try {
      const response = await apiClient.post('/auth/refresh-token', {}, { skipAuthInterceptor: true })
      dispatch(setAuth(response.data.accessToken))
      const userResponse = await apiClient.get('/auth/profile')
      dispatch(setUser(userResponse.data))
    } catch (error) {
      dispatch(logout())
    }
  }
  setLoading(false)
}
```

### 결과

- Refresh Token 만료 시 무한 루프 없이 1회 시도 후 깔끔하게 로그아웃 처리됩니다.
- 비로그인 사용자의 불필요한 401 요청이 제거되었습니다.
- 토큰 갱신 파이프라인에서 "갱신 요청은 인터셉터의 적용 대상에서 명시적으로 제외하고, 재시도는 플래그로 1회 제한한다"는 패턴을 확보했습니다.

---

## 랜덤 정렬 피드의 무한 스크롤 중복 렌더링 (React key 충돌)

**영역**: Backend (MongoDB Aggregation) + Frontend (React)

### 문제

메인 피드는 "매번 새로운 수어티콘을 보여주기 위해" 랜덤 정렬을 기본값으로 사용했습니다. 그런데 무한 스크롤로 다음 페이지를 불러오면 **이미 화면에 있는 아이템이 다시 내려와** 콘솔에 React key 중복 경고가 발생하고, 같은 이미지가 반복 노출되었습니다.

### 원인 분석

초기 구현은 MongoDB의 `$sample`로 랜덤 정렬을 구현했습니다.

```js
// Before — 페이지 개념 없이 매 요청마다 새로 샘플링
images = await Signicon.aggregate([
  { $match: query },
  { $sample: { size: limit } }
])
```

`$sample`은 **호출할 때마다 전체 컬렉션에서 새로 무작위 추출**하므로 페이지네이션 개념이 없습니다. 1페이지와 2페이지 요청이 서로 독립적인 추첨이 되어, 페이지 간 중복과 누락이 구조적으로 발생했습니다. 클라이언트는 응답을 그대로 `id`를 key로 누적 렌더링했기 때문에 key 충돌로 이어졌습니다.

### 해결

**1단계 — 서버: `$sample`을 `$rand` + `$sort` + `$skip/$limit` 파이프라인으로 교체**해 페이지네이션이 가능한 랜덤 정렬로 전환했습니다.

```js
// After — 랜덤 값 필드를 기준으로 정렬한 뒤 페이지 슬라이싱
images = await Signicon.aggregate([
  { $match: query },
  { $addFields: { rand: { $rand: {} } } },
  { $sort: { rand: 1 } },
  { $skip: (pageNumber - 1) * limitNumber },
  { $limit: limitNumber },
  { $project: { filename_webp: 1, id: 1 /* ... */ } }
])
```

**2단계 — 클라이언트: 누적 시 방어적 중복 제거**를 추가했습니다. 랜덤 값이 요청마다 재계산되는 한 페이지 경계의 중복 가능성이 완전히 사라지지는 않으므로, 이미 보유한 `id`는 걸러낸 뒤에만 상태에 추가하고, 신규 아이템이 없으면 더 불러오기를 중단하도록 했습니다.

```jsx
// After — MainPage.jsx
const loadedImages = data.map((img) => ({ id: img.id, src: img.filename_webp }))

// 기존 그리드에 없는 아이템만 추가
const uniqueImages = loadedImages.filter((img) => !gridImages.some((existing) => existing.id === img.id))

if (uniqueImages.length === 0) {
  setHasMore(false)
  setShowLoadMore(false)
  return
}

setGridImages((prev) => [...prev, ...uniqueImages])
```

### 결과

- 무한 스크롤 시 동일 이미지 반복 노출과 React key 중복 경고가 제거되었습니다.
- "랜덤 정렬 + 페이지네이션"은 단순 `$sample`로는 성립하지 않으며, 정렬 가능한 랜덤 키를 만들거나(서버) 클라이언트에서 중복을 흡수하는 이중 방어가 필요하다는 것을 확인했습니다.
- 서버 정렬 보장이 불완전한 목록 API를 소비할 때는 클라이언트 누적 로직에 id 기반 dedup을 두는 것을 기본 패턴으로 삼게 되었습니다.

---

## iOS Safari에서 GIF 다운로드 실패

**영역**: Frontend (React)

### 문제

수어티콘 GIF 다운로드 기능이 데스크톱 크롬에서는 정상 동작했지만, **iOS Safari에서는 클릭해도 파일이 저장되지 않거나** 빈 화면으로 이동하는 현상이 발생했습니다. 중간 수정 이후에는 모든 환경에서 다운로드가 깨지는 회귀도 있었습니다.

### 원인 분석

여러 원인이 겹쳐 있었습니다.

1. **iOS Safari의 Blob URL + `<a download>` 제약**: 데스크톱과 달리 iOS Safari(특히 구버전)는 `URL.createObjectURL(blob)`로 만든 URL에 `download` 속성을 붙여 클릭하는 방식의 지원이 불안정했습니다.
2. **axios 응답을 fetch처럼 다룬 버그**: 다운로드 요청을 fetch에서 axios 인스턴스로 옮기면서 `response.blob()`을 호출했는데, axios 응답 객체에는 `blob()` 메서드가 없습니다. `responseType: 'blob'`을 지정하고 `response.data`를 사용해야 합니다.

```js
// Bug — axios 응답에는 blob() 메서드가 없음 (fetch 시절 코드가 남은 것)
const response = await apiClient.get(downloadUrl)
const blob = await response.blob() // TypeError
```

3. **인증 인터셉터가 붙은 인스턴스로 외부 스토리지 호출**: 파일은 Object Storage(외부 도메인)에 있는데, `Authorization` 헤더를 자동 첨부하는 `apiClient`로 요청해 CORS preflight 문제를 유발할 수 있었습니다.

### 해결

**1단계 — iOS 대응으로 FileReader 기반 data URL 방식 도입**: Blob을 `FileReader.readAsDataURL`로 base64 data URL로 변환해 앵커에 연결하는 방식으로 iOS에서의 저장 실패를 우회했습니다.

```js
const reader = new FileReader()
reader.onloadend = () => {
  const a = document.createElement('a')
  a.href = reader.result // data:image/gif;base64,...
  a.download = downloadFilename
  document.body.appendChild(a)
  a.click()
  a.remove()
}
reader.readAsDataURL(blob)
```

**2단계 — 외부 스토리지 요청은 인증 없는 기본 axios로 분리**하고, `responseType: 'blob'`을 명시했습니다.

```js
// 외부 Object Storage 호출 — 인증 인터셉터가 없는 기본 axios 사용
const response = await axios.get(downloadUrl, { responseType: 'blob' })
const blob = response.data
```

**3단계 — 최종적으로 Blob URL 방식으로 정리**: GIF 파일이 커질수록 base64 변환(약 33% 크기 증가 + 동기 인코딩)이 부담이 되어, 지원 범위를 검증한 후 Blob URL + 즉시 `revokeObjectURL` 해제 방식으로 단순화했습니다. 다운로드 집계 API 호출은 실패해도 다운로드 자체에 영향이 없도록 별도 try/catch로 격리했습니다.

```js
const blobUrl = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = blobUrl
a.download = downloadFilename
document.body.appendChild(a)
a.click()
a.remove()
URL.revokeObjectURL(blobUrl) // 메모리 해제

// 집계 실패가 다운로드 UX를 막지 않도록 격리
try {
  await apiClient.post(`/sign-icons/${image.id}/download`)
} catch (error) {
  console.warn('다운로드 기록 API 실패:', error.response?.status || error.message)
}
```

### 결과

- iOS Safari를 포함한 주요 모바일 환경에서 GIF 다운로드가 정상 동작하게 되었습니다.
- fetch와 axios의 응답 모델 차이(`response.blob()` vs `responseType: 'blob'` + `response.data`)로 인한 회귀를 수정하고, 외부 리소스 요청과 내부 API 요청의 클라이언트를 분리하는 기준을 세웠습니다.
- 부가 기능(다운로드 수 집계)의 실패가 핵심 기능(파일 저장)을 막지 않도록 에러 격리를 적용했습니다.

---

## 카카오톡·인스타그램 인앱 브라우저에서 공유·OAuth 기능 차단

**영역**: Frontend

### 문제

카카오톡으로 공유된 링크를 통해 유입된 사용자가 많았는데, 카카오톡·인스타그램 등 **인앱 브라우저(WebView)** 환경에서 두 가지 핵심 기능이 동작하지 않았습니다.

1. **Web Share API(`navigator.share`) 미지원** → 수어티콘 공유 버튼이 무반응
2. **구글 OAuth 차단** → 구글은 보안 정책상 WebView에서의 OAuth 로그인을 `403 disallowed_useragent`로 거부

### 원인 분석

인앱 브라우저는 일반 브라우저와 UA만 다른 것이 아니라 Web Share API, 파일 다운로드, 서드파티 쿠키, OAuth 등 다수 기능이 제한된 별도 런타임입니다. 코드 수정으로 해결할 수 있는 문제가 아니라, **사용자를 외부 브라우저로 내보내는 것**이 유일한 해법이었습니다. 다만 인앱별로 탈출 방법이 전부 달랐습니다.

### 해결

`index.html`에 React 번들 로드 이전에 실행되는 인앱 감지·탈출 스크립트를 두고, 플랫폼별 분기 처리했습니다.

```js
var useragt = navigator.userAgent.toLowerCase()
var target_url = location.href

if (useragt.match(/kakaotalk/i)) {
  // 카카오톡: 전용 스킴으로 외부 브라우저 호출
  if (confirm('외부 브라우저로 이동합니다.')) {
    location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url)
  }
} else if (useragt.match(/line/i)) {
  // 라인: 쿼리 파라미터로 외부 브라우저 강제
  location.href = target_url + (target_url.indexOf('?') !== -1 ? '&' : '?') + 'openExternalBrowser=1'
} else if (useragt.match(/inapp|naver|instagram|FB_IAB|FBAN|FBIOS|.../i)) {
  if (useragt.match(/android/i)) {
    // 안드로이드: intent 스킴으로 Chrome 강제 실행
    location.href =
      'intent://' + target_url.replace(/https?:\/\//i, '') + '#Intent;scheme=http;package=com.android.chrome;end'
  }
  // iOS는 강제 탈출 스킴이 없어 안내 UI로 유도
}
```

iOS 인앱은 강제로 Safari를 열 수 있는 스킴이 없어, URL을 클립보드에 복사한 뒤 Safari에서 붙여넣도록 안내하는 폴백을 두었습니다. 또한 기능 단위로도 가드를 추가했습니다.

```jsx
// 공유 핸들러 — 인앱이면 기능 실행 전에 즉시 외부 브라우저 유도
const handleShare = async () => {
  if (isInAppBrowser() || isKakaotalk()) {
    await showAlert({
      title: '외부 브라우저로 이동',
      text: '현재 브라우저에서는 공유가 지원되지 않습니다. 외부 브라우저로 이동합니다.'
    })
    redirectToExternalBrowser()
    return
  }
  // ... navigator.share 호출
}
```

```jsx
// 구글 로그인 — 인앱에서는 403이 떨어지기 전에 사전 차단하고 안내
const handleGoogleLogin = () => {
  if (navigator.userAgent.toLowerCase().match(/inapp|kakaotalk|naver|instagram|.../i)) {
    toast('이 브라우저에서 지원하지 않는 기능입니다.')
    return
  }
  window.location.href = import.meta.env.VITE_GOOGLE_REDIRECT_URI
}
```

초기에 진입 즉시 무조건 리다이렉트했더니 카카오톡 미리보기 화면까지 깨지는 부작용이 있어, 카카오톡은 `confirm`으로 사용자 동의 후 이동하도록 조정했습니다.

### 결과

- 카카오톡 공유 링크 유입 사용자가 외부 브라우저로 자연스럽게 전환되어 공유·다운로드·소셜 로그인 전체 플로우가 정상 동작하게 되었습니다.
- 구글 OAuth의 `disallowed_useragent` 에러를 사용자 도달 전에 차단하고 명확한 안내로 대체했습니다.
- 페이지 레벨 가드(index.html)와 기능 레벨 가드(공유/로그인 핸들러)의 이중 방어로, 탈출에 실패한 사용자도 기능 실행 시점에 다시 안내받는 구조를 만들었습니다.

---

## 관리자 통계의 날짜 밀림(UTC↔KST)과 방문 수 중복 집계

**영역**: Backend (MongoDB Aggregation) + Frontend

### 문제

관리자 대시보드의 일별 접속·가입·로그인 통계에서 두 가지 이상 징후가 보고되었습니다.

1. **날짜 밀림**: 한국 시간 자정~오전 9시 사이의 활동이 전날 날짜로 집계됨
2. **방문 수 부풀림**: 실제 사용자 수 대비 메인 페이지 접속 수가 비정상적으로 높음

### 원인 분석

**날짜 밀림**: MongoDB는 `Date`를 UTC로 저장하는데, 집계 시 `$dateToString`이 타임존 지정 없이 UTC 기준으로 날짜 문자열을 만들고 있었습니다. KST는 UTC+9이므로 자정~09시 데이터가 전날로 귀속된 것입니다. 회원탈퇴 카운트도 `new Date().toISOString().slice(0, 10)`으로 서버에서 UTC 날짜 문자열을 만들어 같은 문제가 있었습니다.

**방문 수 부풀림**: 방문 기록 API가 SPA 라우트 변경 때마다 호출되는 구조였습니다. 라우터는 페이지 전환 시 컴포넌트를 언마운트/마운트하므로, 같은 세션에서 메인 ↔ 상세를 오갈 때마다 방문이 반복 기록되었습니다.

### 해결

**1단계 — 집계 파이프라인에 타임존 명시**: 모든 일별 집계의 `$dateToString`에 `timezone: '+09:00'`을 지정했습니다.

```js
// After — statistics.js
{
  $group: {
    _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp', timezone: '+09:00' } } },
    count: { $sum: 1 }
  }
}
```

날짜 문자열을 직접 만드는 곳은 `moment-timezone`으로 KST 기준 변환을 적용했습니다.

```js
// Before: new Date().toISOString().slice(0, 10)  → UTC 날짜
const today = moment().tz('Asia/Seoul').format('YYYY-MM-DD')
await WithdrawalCount.updateOne({ date: today }, { $inc: { count: 1 } }, { upsert: true })
```

**2단계 — 클라이언트 방문 기록 dedup**: `sessionStorage` 플래그로 "대상 페이지 군에 머무는 동안"은 1회만 기록하고, 벗어나면 플래그를 해제해 재진입 시 다시 기록되도록 했습니다.

```jsx
// PageVisitLogger — App.jsx
useEffect(() => {
  const mainPathsRegex = /^(\/$|\/sign-icons\/[^/]+)$/
  const visitKey = 'visitedMainPage'

  if (mainPathsRegex.test(location.pathname)) {
    if (!sessionStorage.getItem(visitKey)) {
      apiClient.post('/user/main-page-visit').catch(() => {})
      sessionStorage.setItem(visitKey, 'true')
    }
  } else {
    // 대상 페이지를 벗어나면 플래그 제거 → 재진입 시 다시 1회 기록
    sessionStorage.removeItem(visitKey)
  }
}, [location.pathname])
```

**3단계 — 통계 데이터 모델 분리**: 가입·로그인·탈퇴 통계가 페이지 방문 로그(`UserActivity`)에 `$lookup`으로 얽혀 있던 구조를, 전용 이벤트 모델 `UserEvent`로 분리했습니다. 각 OAuth 콜백에서 신규 가입 여부를 판별해 `signup`/`login` 이벤트를 명시적으로 적재하고, 집계는 `$lookup` 없이 단일 컬렉션 스캔으로 끝나도록 했습니다.

```js
const UserEventSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { type: String, enum: ['signup', 'login', 'withdrawal'], required: true },
  platform: { type: String }, // 'kakao' | 'naver' | 'google' | 'apple' | 'local'
  createdAt: { type: Date, default: Date.now }
})
```

### 결과

- 일별 통계가 KST 기준으로 정확히 집계되어 운영 리포트의 신뢰도가 회복되었습니다.
- 방문 수가 "페이지 군 진입 단위"로 정규화되어 실제 트래픽과 일치하게 되었습니다.
- 통계용 데이터를 행동 로그에서 파생하지 않고 도메인 이벤트로 직접 적재하는 구조로 전환해, 집계 쿼리가 단순해지고 신규 통계 항목 추가가 쉬워졌습니다.
- "DB에 저장되는 시각은 UTC, 사용자에게 보여지는 날짜는 서비스 타임존"이라는 경계를 모든 집계 코드에 명시하는 것을 팀 기준으로 정립했습니다.
