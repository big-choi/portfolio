import { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'language',
    label: 'Language',
    items: [
      { name: 'TypeScript', description: '타입을 활용한 안전하고 명확한 코드를 작성합니다.' },
      { name: 'JavaScript', description: 'ES6+ 문법을 능숙하게 활용합니다.' },
      { name: 'HTML/CSS', description: '시맨틱 마크업과 반응형 레이아웃을 구현합니다.' }
    ]
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', description: 'Hooks, Context, Suspense를 활용한 컴포넌트 설계가 가능합니다.' },
      { name: 'Next.js', description: 'App Router와 SSR/SSG/CSR을 상황에 맞게 활용합니다.' },
      { name: 'TanStack Query', description: '서버 상태 관리와 캐싱 전략을 적용합니다.' },
      { name: 'Zustand', description: '가볍고 직관적인 전역 상태 관리를 구성합니다.' },
      { name: 'Tailwind CSS', description: '유틸리티 기반의 빠른 스타일링을 선호합니다.' }
    ]
  },
  {
    id: 'tooling',
    label: 'Tooling',
    items: [
      { name: 'Vite', description: '빠른 개발 환경을 위한 번들러로 사용합니다.' },
      { name: 'Jest / RTL', description: '컴포넌트 단위 테스트를 작성합니다.' },
      { name: 'Playwright', description: 'E2E 테스트로 사용자 시나리오를 검증합니다.' }
    ]
  },
  {
    id: 'etc',
    label: 'ETC',
    items: [
      { name: 'Git / GitHub', description: '버전 관리와 협업 워크플로우에 익숙합니다.' },
      { name: 'Vercel', description: 'Next.js 프로젝트 배포에 활용합니다.' },
      { name: 'Figma', description: '디자이너와 협업하며 디자인을 구현합니다.' }
    ]
  }
];
