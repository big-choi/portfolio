import { ExperienceItem } from '@/lib/types';

export const experiences: ExperienceItem[] = [
  {
    period: '2024.01 - 현재',
    company: 'Acme Corp',
    role: 'Frontend Developer',
    summary: '대규모 커머스 플랫폼의 프론트엔드 개발 및 Next.js 기반 마이그레이션을 담당합니다.',
    achievements: [
      '레거시 페이지를 Next.js App Router 기반으로 점진적 마이그레이션',
      '공통 컴포넌트 라이브러리 구축으로 개발 생산성 향상',
      'Lighthouse 성능 점수 60 → 90 개선'
    ],
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS']
  },
  {
    period: '2022.03 - 2023.12',
    company: 'Startup Inc',
    role: 'Frontend Developer',
    summary: '0에서 1을 만드는 초기 스타트업에서 웹 서비스 전반의 UI를 개발했습니다.',
    achievements: [
      'React 기반 SPA 신규 서비스 설계 및 출시',
      'Zustand를 활용한 전역 상태 관리 구조 도입',
      '디자이너와 협업하여 디자인 시스템 v1 구축'
    ],
    stack: ['React', 'TypeScript', 'Zustand', 'Styled Components']
  },
  {
    period: '2021.06 - 2022.02',
    company: 'Agency Studio',
    role: 'Junior Frontend Developer',
    summary: '다양한 클라이언트 웹사이트와 랜딩 페이지를 제작하며 기본기를 다졌습니다.',
    achievements: [
      '반응형 마크업 및 인터랙션 구현',
      '웹 접근성 가이드라인 준수 작업 수행',
      'CMS 연동 정적 사이트 다수 배포'
    ],
    stack: ['JavaScript', 'HTML/CSS', 'Vue', 'GSAP']
  }
];
