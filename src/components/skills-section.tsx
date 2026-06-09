'use client';

import { useState } from 'react';
import { skillCategories } from '@/data/skills';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SkillIcon } from '@/components/ui/skill-icon';

export function SkillsSection() {
  const [activeId, setActiveId] = useState(skillCategories[0]?.id);
  const activeCategory = skillCategories.find((category) => category.id === activeId) ?? skillCategories[0];

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <SectionHeading index="04" title="Skills" />
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category) => {
            const isActive = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'border border-border text-muted hover:bg-surface hover:text-foreground'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {activeCategory.items.map((skill) => (
          <div key={skill.name} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-accent">
                <SkillIcon icon={skill.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-mono text-base font-semibold text-foreground">{skill.name}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
