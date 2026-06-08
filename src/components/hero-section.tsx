import { profile } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';

export function HeroSection() {
  return (
    <section id="top" className="mx-auto flex max-w-5xl flex-col justify-center px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
      <Reveal>
        <p className="font-mono text-sm text-accent">Hi, my name is</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-3 text-2xl font-semibold text-muted sm:text-4xl">{profile.role}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{profile.intro}</p>
      </Reveal>

      <Reveal delay={120} className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            View projects
          </a>
        </div>
      </Reveal>
    </section>
  );
}
