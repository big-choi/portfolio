interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
}

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-accent">{index}.</span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      <div className="h-px w-full bg-border" />
      {description ? <p className="max-w-2xl text-sm leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}
