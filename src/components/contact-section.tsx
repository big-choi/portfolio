import { profile } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          index="05"
          title="Contact"
          description="새로운 기회나 협업 제안을 기다리고 있습니다. 언제든 편하게 연락 주세요."
        />
      </Reveal>

      <Reveal delay={120}>
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface px-6 py-16 text-center sm:py-20">
          <p className="font-mono text-sm font-medium text-accent">Get in touch</p>
          <a
            href={`mailto:${profile.email}`}
            className="text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-accent sm:text-4xl"
          >
            {profile.email}
          </a>
          <p className="text-muted">{profile.location}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
