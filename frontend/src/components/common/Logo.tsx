import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

interface LogoProps {
  href?: string;
}

export default function Logo({ href = '/' }: LogoProps) {
  return (
    <Link href={href} className="group flex min-w-0 items-center gap-3">
      <div
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl
          bg-primary/10
          text-primary
          ring-1 ring-primary/20
          transition-all duration-200
          group-hover:bg-primary/15
          group-hover:shadow-lg
          group-hover:shadow-primary/20
        "
      >
        <BrainCircuit className="h-6 w-6" />
      </div>

      <div className="min-w-0">
        <div className="truncate text-lg font-bold tracking-tight">DocMind AI</div>

        <div className="truncate text-[10px] font-medium text-muted-foreground">
          AI Knowledge Assistant
        </div>
      </div>
    </Link>
  );
}
