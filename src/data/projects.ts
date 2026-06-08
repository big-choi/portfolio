import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    title: '온글 (Easy-Read)',
    period: '2025.05 ~ 2026.05',
    description:
      'AI를 활용해 어려운 문장을 쉬운 글로 변환하는 B2B SaaS입니다. PM 부재 상황에서 와이어프레임과 UI 정의서를 직접 설계했고, 테넌트별 통계를 단일 허브로 통합해 중복 화면을 최대 75% 축소, 대시보드 초기 LCP를 약 45% 개선했습니다.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Node.js', 'Express', 'Firebase', 'GA', 'PostHog'],
    links: [],
    featured: true
  },
  {
    title: '사이너리 (Signery)',
    period: '2024.10 ~ 2025.04',
    description:
      '수어 기반 이모티콘인 수어티콘을 검색·조회·다운로드·공유할 수 있는 웹 플랫폼입니다. 프론트엔드·백엔드 구조를 설계하고, NKS/NCP MongoDB 인프라를 Firebase로 전환하여 월 운영비를 약 90% 절감했습니다. 소셜 로그인과 계정·컬렉션 관리 기능을 개발했습니다.',
    stack: ['React', 'TypeScript', 'Node.js', 'Firebase', 'MongoDB'],
    links: [],
    featured: true
  },
  {
    title: 'WebGL 수어 플레이어',
    period: '2024.06 ~ 2025.02',
    description:
      '브라우저 환경에서 수어 애니메이션을 재생하는 WebGL 플레이어입니다. 관리되지 않던 Git submodule 구조를 재사용 가능한 공통 컴포넌트로 전환하여 신규 데모 페이지 구축 리소스를 약 50% 절감하고 유지보수성을 개선했습니다.',
    stack: ['JavaScript', 'React', 'WebGL', 'CSS'],
    links: [],
    featured: false
  }
];
