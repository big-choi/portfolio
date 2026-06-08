import { profile } from '@/data/profile';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-xs text-muted">
          © {year} {profile.name}. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
