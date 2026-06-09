import { AboutContent, Profile } from '@/lib/types';

export const profile: Profile = {
  name: '최보성',
  role: 'Frontend Developer',
  tagline: '화면 구현을 넘어 사용자 흐름, 운영 구조, 개발 생산성까지 고려하는 4년차 프론트엔드 개발자입니다.',
  intro:
    'React와 TypeScript를 주력으로 사용자 인터페이스를 만듭니다. 컴포넌트 설계와 렌더링 최적화, 상태 관리, 협업을 고려한 코드 구조화에 관심이 많으며, 더 나은 사용자 경험을 만드는 데 집중하고 있습니다.',
  email: 'bos33210@naver.com',
  location: 'Seoul, Korea',
  stats: [
    { value: '4+', label: 'Years of Experience' },
    { value: '96%', label: 'Infra Cost Reduction' },
    { value: '3x', label: 'Client Growth' }
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/big-choi' },
    { label: 'Email', href: 'mailto:bos33210@naver.com' }
  ]
};

export const about: AboutContent = {
  paragraphs: [
    '안녕하세요. 사용자 경험과 개발 효율을 함께 개선하는 프론트엔드 개발자 최보성입니다.',
    '기능을 구현하는 데서 멈추지 않고, 왜 이 기능이 필요한지, 어떤 사용자 흐름에서 사용되는지, 운영 과정에서 어떤 문제가 생길 수 있는지를 함께 고려합니다.',
    '프론트엔드 개발자로서 전문성을 확장해 나가면서도, 조직과 함께 성장하는 개발자가 되고자 합니다.'
  ],
  highlights: [
    {
      title: 'Cost & Infra Optimization',
      description:
        '서비스 규모에 맞는 인프라를 판단하고, Firebase 마이그레이션으로 월 운영 비용을 약 96% 절감했습니다.',
      keywords: ['Firebase', 'Migration', 'Cost Saving']
    },
    {
      title: 'Productivity & Structure',
      description: '디자인 시스템 구축과 공통 컴포넌트화로 UI 파편화를 해결하고 신규 구축 리소스를 약 50% 줄였습니다.',
      keywords: ['Design System', 'Reusability', 'Refactoring']
    },
    {
      title: 'Product & UX Thinking',
      description: '와이어프레임과 UI 정의서를 직접 설계하고, 화면별 사용자 플로우를 정리해 개발까지 연결했습니다.',
      keywords: ['Wireframe', 'User Flow', 'UI Spec']
    }
  ]
};
