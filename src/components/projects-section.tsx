import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <SectionHeading index="03" title="Projects" description="대표적인 작업물들을 모았습니다." />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, idx) => (
          <Reveal key={project.title} delay={idx * 80} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
