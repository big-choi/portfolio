import { SkillCategory } from '@/lib/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'language',
    label: 'Language',
    items: [
      { name: 'TypeScript', description: '타입을 활용한 안전하고 명확한 코드를 작성합니다.', icon: 'typescript' },
      { name: 'JavaScript', description: 'ES6+ 문법으로 사용자 화면 기능을 구현합니다.', icon: 'javascript' },
      { name: 'HTML/CSS', description: '시맨틱 마크업과 반응형 레이아웃을 구현합니다.', icon: 'html5' }
    ]
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', description: '인증, 관리자, 검수 CMS 등 다양한 웹 서비스를 개발했습니다.', icon: 'react' },
      { name: 'Next.js', description: 'React 기반의 프로덕션 웹 애플리케이션을 구성합니다.', icon: 'nextjs' },
      { name: 'Redux', description: '복잡한 클라이언트 상태를 예측 가능하게 관리합니다.', icon: 'redux' },
      { name: 'TanStack Query', description: '서버 상태 관리와 캐싱 전략을 적용합니다.', icon: 'reactquery' },
      {
        name: 'React Testing Library',
        description: 'React 컴포넌트를 테스트하는 라이브러리를 사용합니다.',
        icon: 'testinglibrary'
      },
      { name: 'Tailwind CSS', description: '디자인 시스템과 함께 일관된 스타일링을 구현합니다.', icon: 'tailwindcss' },
      { name: 'shadcn/ui', description: 'UI 컴포넌트 라이브러리를 사용합니다.', icon: 'shadcn' },
      { name: 'jQuery', description: '레거시 웹 화면의 기능 개발 및 유지보수 경험이 있습니다.', icon: 'jquery' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend & Infra',
    items: [
      { name: 'Node.js', description: '서비스 백엔드와 사전 체험 페이지를 개발했습니다.', icon: 'nodejs' },
      { name: 'Express', description: 'REST API 서버를 구성하고 운영합니다.', icon: 'express' },
      { name: 'Firebase', description: '인증, Hosting, 인프라 전환으로 운영 비용을 최적화했습니다.', icon: 'firebase' },
      { name: 'MongoDB', description: 'NCP 기반 NoSQL 데이터베이스를 설계·운영했습니다.', icon: 'mongodb' },
      { name: 'Spring Boot', description: 'API Server 개발·유지보수 경험이 있습니다.', icon: 'springboot' },
      { name: 'REST API', description: '프론트엔드와 백엔드 간 API 연동 구조를 설계합니다.', icon: 'api' }
    ]
  },
  {
    id: 'etc',
    label: 'ETC',
    items: [
      { name: 'Git', description: '버전 관리와 협업 워크플로우에 익숙합니다.', icon: 'git' },
      { name: 'GitHub Actions', description: 'CI/CD 파이프라인으로 배포 프로세스를 효율화합니다.', icon: 'githubactions' },
      { name: 'Linux/Tomcat', description: '운영 환경에서 서비스 배포와 장애 대응을 수행했습니다.', icon: 'linux' }
    ]
  }
];
