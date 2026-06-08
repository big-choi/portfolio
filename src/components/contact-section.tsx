'use client';

import { FormEvent, useState } from 'react';
import { profile } from '@/data/profile';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function ContactSection() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(title || '포트폴리오 문의');
    const body = encodeURIComponent(`${message}\n\n— ${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none';

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          index="05"
          title="Contact"
          description="새로운 기회나 협업 제안을 기다리고 있습니다. 언제든 편하게 연락 주세요."
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="flex flex-col gap-4">
            <a href={`mailto:${profile.email}`} className="text-lg font-semibold text-foreground hover:text-accent">
              {profile.email}
            </a>
            <p className="text-sm text-muted">{profile.location}</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  {social.label} →
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm text-muted">
                제목
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="문의 제목"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-muted">
                이메일
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-muted">
                메시지
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="내용을 입력해 주세요."
                className={`${inputClass} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              메일 보내기
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
