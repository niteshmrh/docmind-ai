import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  accent?: 'purple' | 'green' | 'blue' | 'orange';
}

const accents = {
  purple: {
    icon: 'bg-primary/10 text-primary',
    glow: 'from-primary/10',
  },
  green: {
    icon: 'bg-emerald-500/10 text-emerald-500',
    glow: 'from-emerald-500/10',
  },
  blue: {
    icon: 'bg-blue-500/10 text-blue-500',
    glow: 'from-blue-500/10',
  },
  orange: {
    icon: 'bg-orange-500/10 text-orange-500',
    glow: 'from-orange-500/10',
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  accent = 'purple',
}: StatsCardProps) {
  const colors = accents[accent];

  return (
    <Card
      className={`
        group relative overflow-hidden
        rounded-2xl border-border
        bg-card shadow-none
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-primary/25
        hover:shadow-xl hover:shadow-primary/5
      `}
    >
      {/* Decorative gradient */}
      <div
        className={`
          pointer-events-none absolute
          right-0 top-0 h-32 w-32
          bg-gradient-to-bl ${colors.glow}
          to-transparent blur-2xl
          opacity-70
        `}
      />

      <CardContent className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div
            className={`
              flex h-11 w-11 items-center
              justify-center rounded-xl
              ${colors.icon}
            `}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div
            className="
              flex h-7 w-7 items-center justify-center
              rounded-lg text-muted-foreground
              opacity-0 transition-all
              group-hover:bg-primary/10
              group-hover:text-primary
              group-hover:opacity-100
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-muted-foreground">{title}</p>

        <p className="mt-1 font-heading text-3xl font-bold tracking-tight">{value}</p>

        {description && <p className="mt-2 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}
