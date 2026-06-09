import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { SiteFooter } from '@/components/site-footer';
import { Tag } from '@/components/ui/tag';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: `Project | ${profile.name}` };
  }

  return {
    title: `${project.title} | ${profile.name}`,
    description: project.description
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> Projects
        </Link>

        <header className="mt-8">
          <p className="font-mono text-sm text-accent">{project.period}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
          {project.company ? <p className="mt-2 text-base text-muted">{project.company}</p> : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
        </header>

        <div className="mt-10 h-px w-full bg-border" />

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{project.overview}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">역할</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {project.responsibilities.map((item) => (
              <li key={item} className="flex gap-2 text-base leading-relaxed text-muted">
                <span className="mt-1 text-accent">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">성과</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {project.achievements.map((item) => (
              <li key={item} className="flex gap-2 text-base leading-relaxed text-muted">
                <span className="mt-1 text-accent">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {project.links.length > 0 ? (
          <section className="mt-10 flex flex-wrap gap-4 border-t border-border pt-6">
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
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
