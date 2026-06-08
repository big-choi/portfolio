import { experiences } from '@/data/experience';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { Tag } from '@/components/ui/tag';

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <SectionHeading index="02" title="Experience" />
      </Reveal>

      <ol className="relative flex flex-col gap-10 border-l border-border pl-6 sm:pl-8">
        {experiences.map((item, idx) => (
          <Reveal key={`${item.company}-${item.period}`} delay={idx * 80}>
            <li className="relative">
              <span className="absolute top-1.5 -left-[1.6rem] h-3 w-3 rounded-full border-2 border-accent bg-background sm:-left-[2.1rem]" />
              <p className="font-mono text-xs text-accent">{item.period}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {item.role}
                <span className="text-muted"> @ {item.company}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2 text-sm text-muted">
                    <span className="text-accent">▹</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <Tag key={tech} label={tech} />
                ))}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
