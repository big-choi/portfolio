export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  email: string;
  location: string;
  stats: Stat[];
  socials: SocialLink[];
}

export interface Highlight {
  title: string;
  description: string;
  keywords: string[];
}

export interface AboutContent {
  paragraphs: string[];
  highlights: Highlight[];
}

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface Project {
  title: string;
  period: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
  featured: boolean;
}

export interface SkillItem {
  name: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: SkillItem[];
}
