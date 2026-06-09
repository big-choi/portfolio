import Link from 'next/link';
import { Project } from '@/lib/types';
import { Tag } from '@/components/ui/tag';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.title} 상세보기`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 hover:bg-surface-hover focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
    >
      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-1 font-mono text-xs text-muted">
        {project.period}
        {project.company ? ` · ${project.company}` : ''}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech} label={tech} />
        ))}
      </div>
    </Link>
  );
}
