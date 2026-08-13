import { CheckCircle2, Clock3, Loader2, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    UPLOADING: {
      label: 'Uploading',
      className: 'bg-blue-500/10 text-blue-600',
      icon: Loader2,
    },

    PROCESSING: {
      label: 'Processing',
      className: 'bg-yellow-500/10 text-yellow-600',
      icon: Loader2,
    },

    READY: {
      label: 'Ready',
      className: 'bg-green-500/10 text-green-600',
      icon: CheckCircle2,
    },

    FAILED: {
      label: 'Failed',
      className: 'bg-red-500/10 text-red-600',
      icon: XCircle,
    },
  } as const;

  const current = config[status as keyof typeof config];

  if (!current) {
    return <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{status}</span>;
  }

  const Icon = current.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        current.className
      )}
    >
      <Icon
        className={cn(
          'h-3.5 w-3.5',
          status === 'UPLOADING' || status === 'PROCESSING' ? 'animate-spin' : ''
        )}
      />

      {current.label}
    </span>
  );
}
