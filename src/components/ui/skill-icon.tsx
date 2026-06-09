import type { IconType } from 'react-icons';
import {
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiShadcnui,
  SiSpringboot,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript
} from 'react-icons/si';
import { TbApi, TbCode } from 'react-icons/tb';

const iconMap: Record<string, IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  react: SiReact,
  nextjs: SiNextdotjs,
  redux: SiRedux,
  reactquery: SiReactquery,
  testinglibrary: SiTestinglibrary,
  tailwindcss: SiTailwindcss,
  shadcn: SiShadcnui,
  jquery: SiJquery,
  nodejs: SiNodedotjs,
  express: SiExpress,
  firebase: SiFirebase,
  mongodb: SiMongodb,
  springboot: SiSpringboot,
  api: TbApi,
  git: SiGit,
  githubactions: SiGithubactions,
  linux: SiLinux
};

interface SkillIconProps {
  icon: string;
  className?: string;
}

export function SkillIcon({ icon, className }: SkillIconProps) {
  const Icon = iconMap[icon] ?? TbCode;
  return <Icon className={className} aria-hidden="true" />;
}
