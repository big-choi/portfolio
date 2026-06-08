import { Stat } from '@/lib/types';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:bg-surface-hover">
      <p className="font-mono text-3xl font-bold text-foreground">{stat.value}</p>
      <p className="mt-1 text-sm text-muted">{stat.label}</p>
    </div>
  );
}
