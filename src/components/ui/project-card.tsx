import { Project } from '@/lib/types';
import { Tag } from '@/components/ui/tag';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 hover:bg-surface-hover">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        {project.featured ? (
          <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">Featured</span>
        ) : null}
      </div>
      <p className="mt-1 font-mono text-xs text-muted">{project.period}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            {link.label} →
          </a>
        ))}
      </div>
    </article>
  );
}
