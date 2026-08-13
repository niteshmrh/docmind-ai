import { CheckCircle2, Clock3, Loader2, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    UPLOADING: {
      label: 'UPLOADING',
      className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      icon: Loader2,
    },

    PROCESSING: {
      label: 'PROCESSING',
      className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      icon: Clock3,
    },

    READY: {
      label: 'READY',
      className: 'bg-green-500/10 text-green-600 dark:text-green-400',
      icon: CheckCircle2,
    },

    FAILED: {
      label: 'FAILED',
      className: 'bg-red-500/10 text-red-600 dark:text-red-400',
      icon: XCircle,
    },
  } as const;

  const current = config[status as keyof typeof config];

  if (!current) {
    return (
      <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium">{status}</span>
    );
  }

  const Icon = current.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide',
        current.className
      )}
    >
      {current.label}
    </span>
  );
}
