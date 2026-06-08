import { ExperienceItem } from '@/lib/types';

export const experiences: ExperienceItem[] = [
  {
    period: '2024.05 - 현재',
    company: '㈜이큐포올',
    role: 'Frontend Developer',
    summary: 'AI 기반 SaaS와 수어 콘텐츠 플랫폼의 프론트엔드·백엔드 설계 및 개발을 담당하고 있습니다.',
    achievements: [
      '디자인 시스템 구축으로 UI 파편화 해결 및 중복 코드 제거',
      '멀티 테넌트 기반 검수 CMS와 권한별 화면 흐름 설계·개발',
      'SSE를 활용한 AI 변환문 스트리밍 기능 개발',
      'NKS/NCP MongoDB 인프라를 Firebase로 전환하여 운영 비용 약 96% 절감',
      'Google/Apple/Kakao 소셜 로그인 및 사용자 계정 기능 개발'
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Node.js', 'Firebase']
  },
  {
    period: '2021.10 - 2023.06',
    company: '아름누리메디컴',
    role: 'Web Developer',
    summary: '병원/검진기관용 전자문진 및 결과통보서 솔루션의 개발·유지보수와 운영 환경 관리를 담당했습니다.',
    achievements: [
      'JavaScript/jQuery 기반 사용자 화면 개발 및 UI/UX 개선',
      'Spring Boot 기반 API Server 개발·유지보수, Linux/Tomcat 운영 및 장애 대응',
      'Vue.js, Spring Boot 기반 사내 관리자 페이지 신규 개발',
      'GitHub Actions 기반 CI/CD 적용 및 백업·이중화로 서비스 안정성 개선',
      'Lighthouse 성능 점수 약 15% 향상, 솔루션 도입 거래처 약 2.2~3배 증가'
    ],
    stack: ['JavaScript', 'jQuery', 'Vue.js', 'Spring Boot', 'Linux/Tomcat']
  }
];
