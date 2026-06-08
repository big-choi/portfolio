'use client';

import { useEffect, useState } from 'react';
import { navItems } from '@/data/navigation';
import { profile } from '@/data/profile';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        isScrolled ? 'border-border bg-background/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight" onClick={closeMenu}>
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={isOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-lg leading-none">{isOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {isOpen ? (
        <ul className="flex flex-col gap-1 border-t border-border bg-background px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
