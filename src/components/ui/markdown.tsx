import ReactMarkdown, { type Components } from 'react-markdown';

const components: Components = {
  h3: ({ children }) => <h4 className="mt-6 text-sm font-semibold tracking-wide text-accent first:mt-0">{children}</h4>,
  p: ({ children }) => <p className="mt-3 text-base leading-relaxed text-muted">{children}</p>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-accent">{children}</ol>,
  li: ({ children }) => <li className="text-base leading-relaxed text-muted">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
      {children}
    </a>
  ),
  pre: ({ children }) => (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm leading-relaxed text-foreground">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isBlock = typeof className === 'string' && className.startsWith('language-');

    if (isBlock) {
      return <code className={className}>{children}</code>;
    }

    return <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{children}</code>;
  }
};

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
