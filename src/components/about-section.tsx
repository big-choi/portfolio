import { about } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { Tag } from '@/components/ui/tag';

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <SectionHeading index="01" title="About Me" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="flex flex-col gap-4">
            {about.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-4">
            {about.highlights.map((highlight) => (
              <div key={highlight.title} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-base font-semibold text-foreground">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{highlight.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {highlight.keywords.map((keyword) => (
                    <Tag key={keyword} label={keyword} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
