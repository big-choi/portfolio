import { AboutContent, Profile } from '@/lib/types';

export const profile: Profile = {
  name: '홍길동',
  role: 'Frontend Developer',
  tagline: '사용자에게 가장 먼저 닿는 화면을 만드는 프론트엔드 개발자입니다.',
  intro:
    '컴포넌트 설계와 렌더링 최적화, 상태 관리에 관심이 많으며 더 나은 사용자 경험을 만드는 데 집중합니다. React와 Next.js를 주력으로 사용합니다.',
  email: 'hello@example.com',
  location: 'Seoul, Korea',
  stats: [
    { value: '3+', label: 'Years of Experience' },
    { value: '12+', label: 'Projects Shipped' },
    { value: '20+', label: 'Tech Stacks' }
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Blog', href: 'https://example.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' }
  ]
};

export const about: AboutContent = {
  paragraphs: [
    '안녕하세요. 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자 홍길동입니다.',
    '재사용 가능한 컴포넌트 설계, 협업을 고려한 코드 구조화, 성능 최적화에 관심이 많습니다. 작은 디테일이 제품의 완성도를 만든다고 믿으며, 꾸준한 학습으로 더 나은 경험을 만들어 갑니다.'
  ],
  highlights: [
    {
      title: 'Component-Driven UI',
      description: '재사용성과 접근성을 고려한 컴포넌트 시스템을 설계하고 디자인 시스템을 구축합니다.',
      keywords: ['Design System', 'Accessibility', 'Reusability']
    },
    {
      title: 'Performance Optimization',
      description: '렌더링 최적화, 코드 스플리팅, 캐싱 전략으로 빠르고 가벼운 웹을 만듭니다.',
      keywords: ['Rendering', 'Caching', 'Core Web Vitals']
    },
    {
      title: 'Collaboration',
      description: '명확한 코드 리뷰와 문서화로 팀과 함께 성장하는 개발 문화를 지향합니다.',
      keywords: ['Code Review', 'Documentation', 'Communication']
    }
  ]
};
