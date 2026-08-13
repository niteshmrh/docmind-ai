import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  href?: string;
}

export default function Logo({ href = '/' }: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-600/20">
        <Sparkles className="h-5 w-5 text-white" />
      </div>

      <div>
        <div className="text-lg font-bold tracking-tight">DocMind AI</div>

        <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          Intelligent Documents
        </div>
      </div>
    </Link>
  );
}
