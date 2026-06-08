import { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    title: 'Commerce Platform',
    period: '2024.01 ~ 현재',
    description:
      'Next.js App Router 기반의 커머스 플랫폼입니다. SSR/SSG/CSR을 상황에 맞게 조합하고, 서버 컴포넌트로 초기 로딩 성능을 개선했습니다.',
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS'],
    links: [
      { label: 'Live', href: 'https://example.com' },
      { label: 'GitHub', href: 'https://github.com' }
    ],
    featured: true
  },
  {
    title: 'Design System',
    period: '2023.05 ~ 2023.12',
    description:
      '재사용 가능한 컴포넌트 라이브러리와 Storybook 기반 문서를 구축했습니다. 접근성과 일관성을 최우선으로 설계했습니다.',
    stack: ['React', 'TypeScript', 'Storybook', 'Vanilla Extract'],
    links: [{ label: 'GitHub', href: 'https://github.com' }],
    featured: true
  },
  {
    title: 'Realtime Dashboard',
    period: '2023.01 ~ 2023.04',
    description: 'WebSocket을 활용한 실시간 데이터 대시보드입니다. 차트 렌더링 최적화와 가상 스크롤을 적용했습니다.',
    stack: ['React', 'TypeScript', 'Zustand', 'Recharts'],
    links: [
      { label: 'Live', href: 'https://example.com' },
      { label: 'GitHub', href: 'https://github.com' }
    ],
    featured: false
  },
  {
    title: 'Portfolio Website',
    period: '2022.10 ~ 2022.11',
    description: '개인 포트폴리오 사이트입니다. 가벼운 정적 사이트로 빠른 로딩과 깔끔한 UI에 집중했습니다.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [{ label: 'GitHub', href: 'https://github.com' }],
    featured: false
  }
];
