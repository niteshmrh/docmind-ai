'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-bold">🧠 DocMind AI</h2>
        <p className="text-sm text-muted-foreground">AI Knowledge Assistant</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
