import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    slug: 'onguel',
    title: '온글 (Easy-Read)',
    company: '㈜이큐포올',
    period: '2025.05 ~ 2026.05',
    description: 'AI로 어려운 문장을 쉬운 글로 변환하는 B2B SaaS의 프론트엔드를 설계·개발했습니다.',
    overview:
      'AI를 활용해 어려운 문장을 쉬운 글로 변환하는 B2B SaaS입니다. AI가 생성한 변환문을 내부 검수자가 판별·수정하는 검수 기능과 멀티 테넌트 기반 관리 기능을 제공합니다. PM 부재 상황에서 와이어프레임과 UI 정의서를 직접 설계해 개발까지 연결했습니다.',
    responsibilities: [
      '와이어프레임, UI 정의서, 사용자 플로우 설계·개발',
      'SSE를 활용한 AI 변환문 스트리밍 기능 개발',
      'TanStack Query를 활용한 서버 상태 관리 및 캐싱 전략 적용',
      '검수 상태 관리·검수자 배정 등 검수 CMS 프론트엔드 개발',
      '멀티 테넌트 기반 관리자/사용자/검수자 권한별 화면 흐름 개발',
      '사전 체험(Free Trial) 페이지 프론트엔드 및 백엔드 개발',
      'GA, PostHog 연동을 통한 사용자 유입 분석 및 개별 사용자 행동 분석'
    ],
    achievements: [
      'React Testing Library를 활용한 테스트 코드 작성으로 유지보수성 개선',
      '디자인 시스템 구축으로 디자이너·개발자 간 UI 파편화 해결 및 중복 코드 제거',
      '테넌트별 통계 메뉴를 단일 통계 허브로 통합하여 중복 화면 최대 75% 축소',
      '대시보드 기준 초기 LCP 3~4초대 대비 약 45% 개선',
      'UX 결함 수정과 온보딩 플로우 개선으로 도입 문의 수요 28% 증가'
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'React Testing Library', 'shadcn/ui'],
    links: [],
    access: 'private'
  },
  {
    slug: 'signery',
    title: '사이너리 (Signery)',
    company: '㈜이큐포올',
    period: '2024.10 ~ 2025.04',
    description: '수어 기반 이모티콘(수어티콘)을 제공하는 웹 플랫폼의 프론트엔드·백엔드를 개발했습니다.',
    overview:
      '수어 기반 이모티콘인 수어티콘을 검색·조회·다운로드·공유할 수 있는 웹 플랫폼입니다. 프론트엔드와 백엔드 구조를 설계하고 주요 기능을 개발했으며, 운영 비용 문제를 직접 진단해 인프라를 Firebase로 전환했습니다.',
    responsibilities: [
      '수어티콘 검색·조회·다운로드·공유 웹 플랫폼의 프론트엔드 및 백엔드 구조 설계와 주요 기능 개발',
      'NKS, NCP MongoDB 기반 초기 인프라 구성',
      '서비스 규모 대비 과도한 인프라 비용을 판단하여 Firebase 마이그레이션 추진',
      'Google·Apple·Kakao 소셜 로그인 및 로그인 상태 유지 기능 개발',
      '회원탈퇴, 정보 변경, 컬렉션 생성·삭제 등 사용자 계정 기능 개발',
      'Firebase Hosting 기반 배포 구조 구성 및 문서화'
    ],
    achievements: [
      'NKS/NCP MongoDB 인프라를 Firebase로 전환하여 월 운영비 약 90% 절감',
      '크로스 브라우징 구현으로 공유·다운로드 등 이모티콘 상호작용 시 이탈율 감소',
      '데이터 수집·통계 기능 개발로 데이터 기반의 콘텐츠 서비스 개선 기반 마련'
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Firebase Hosting', 'Kubernetes', 'MongoDB'],
    links: [{ label: 'Live', href: 'https://signery.eq4all.co.kr' }],
    access: 'public'
  },
  {
    slug: 'webgl-sign-player',
    title: 'WebGL 수어 플레이어',
    company: '㈜이큐포올',
    period: '2024.06 ~ 2025.02',
    description: '브라우저에서 수어 애니메이션을 재생하는 WebGL 플레이어를 공통 컴포넌트로 구조화했습니다.',
    overview:
      '브라우저 환경에서 수어 애니메이션을 재생하기 위한 WebGL 플레이어입니다. 관리되지 않던 Git submodule 기반 연동 구조를 재사용 가능한 공통 컴포넌트로 전환하여 유지보수성과 재사용성을 개선했습니다.',
    responsibilities: [
      '기존 Git submodule 기반 WebGL Player 연동 구조 분석',
      '관리되지 않던 submodule 방식을 제거하고 재사용 가능한 공통 컴포넌트 구조로 전환',
      '데모 페이지에서 동일한 Player UI와 로직을 재사용할 수 있도록 구조화',
      '테스트 페이지 UI 및 CSS 정리, 수어 문장 분리 로직 수정',
      '중복 코드 제거, 조건문 정리 및 프로젝트 설정 정리'
    ],
    achievements: [
      'submodule 기반 연동 구조를 공통 컴포넌트 구조로 전환',
      'WebGL Player가 필요한 신규 데모 페이지 구축 리소스 약 50% 절감',
      '테스트 페이지 일치화로 데모 검증 환경 표준화',
      '인터페이스 중복 코드 제거 및 조건문 정리로 유지보수성 개선'
    ],
    stack: ['JavaScript', 'React', 'WebGL', 'CSS'],
    links: [],
    access: 'private'
  },
  {
    slug: 'e-questionnaire',
    title: '전자문진·결과통보 솔루션',
    company: '아름누리메디컴',
    period: '2021.10 ~ 2023.06',
    description: '병원·검진기관용 전자문진/결과통보 웹 솔루션을 개발·유지보수하고 서비스 안정화를 이끌었습니다.',
    overview:
      '병원/검진기관에서 사용하는 웹 기반 전자문진 시스템과 결과통보 기능을 개발·유지보수했습니다. JavaScript/jQuery 기반 화면 개발부터 Spring Boot API Server 유지보수, Linux/Tomcat 운영, Vue.js 기반 사내 관리자 페이지 신규 개발까지 웹 서비스 운영 전반을 담당했습니다.',
    responsibilities: [
      'JavaScript, jQuery 기반 사용자 화면 기능 개발 및 UI/UX 개선',
      'Spring Boot 기반 API Server 개발·유지보수, Java/JSP 기존 기능 유지보수 및 API 연동',
      'Vue.js, Spring Boot 기반 사내 관리자 페이지 신규 개발',
      'Linux, Tomcat8 운영 환경에서 서비스 배포 및 장애 대응',
      'GitHub Actions 기반 CI/CD 적용으로 개발·배포 프로세스 효율화',
      'DB 백업 정책 수립 및 시스템 이중화 구조 구축'
    ],
    achievements: [
      '백업 정책과 이중화 구조로 데이터 손실·서비스 중단 리스크를 줄여 서비스 안정성 개선',
      'Google Lighthouse 기준 성능 점수 약 15% 향상',
      '서비스 안정화로 솔루션 도입 거래처 약 2.2~3배 증가',
      '불만·사후지원 리소스 약 50% 감소 및 솔루션 흑자 전환에 기여'
    ],
    stack: ['JavaScript', 'jQuery', 'Vue.js', 'Spring Boot', 'Java/JSP', 'Linux/Tomcat', 'GitHub Actions'],
    links: [],
    access: 'private'
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
