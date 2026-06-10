import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { SiteFooter } from '@/components/site-footer';
import { Markdown } from '@/components/ui/markdown';
import { Tag } from '@/components/ui/tag';
import { getTroubleshooting } from '@/lib/troubleshooting';

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

  const troubleshooting = getTroubleshooting(project.slug);

  return (
    <>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 transition-transform group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Projects
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
              <li key={item} className="flex gap-2.5 text-base leading-relaxed text-muted">
                <span className="flex h-[1lh] shrink-0 items-center text-accent" aria-hidden="true">
                  <svg viewBox="0 0 8 8" className="size-2 fill-current">
                    <path d="M2 0 6 4 2 8Z" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">성과</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {project.achievements.map((item) => (
              <li key={item} className="flex gap-2.5 text-base leading-relaxed text-muted">
                <span className="flex h-[1lh] shrink-0 items-center text-accent" aria-hidden="true">
                  <svg viewBox="0 0 8 8" className="size-2 fill-current">
                    <path d="M2 0 6 4 2 8Z" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {troubleshooting.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">트러블슈팅</h2>
            <div className="mt-4 flex flex-col gap-3">
              {troubleshooting.map((item) => (
                <details
                  key={item.title}
                  className="group rounded-xl border border-border bg-surface/40 px-5 py-4 transition-colors open:bg-surface/60"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    <span>{item.title}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="mt-3 border-t border-border pt-3">
                    <Markdown>{item.body}</Markdown>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {project.links.length > 0 || project.access === 'private' ? (
          <section className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6">
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
            {project.links.length === 0 && project.access === 'private' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-muted">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3.5"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                사내 솔루션 · 비공개
              </span>
            ) : null}
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
