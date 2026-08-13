'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';

import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isInitialized } = useAuth();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isInitialized, pathname, router]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div
            className="
              h-5 w-5 animate-spin rounded-full
              border-2 border-primary/20
              border-t-primary
            "
          />
          Checking authentication...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="docmind-gradient flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden h-screen shrink-0 lg:flex">
        <AppSidebar />
      </div>

      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileSidebarOpen(false)}
            className="
              absolute inset-0
              bg-black/60
              backdrop-blur-sm
            "
          />

          <div className="relative h-full w-[270px] max-w-[85vw]">
            <AppSidebar onNavigate={() => setMobileSidebarOpen(false)} />

            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileSidebarOpen(false)}
              className="
                absolute right-3 top-4
                flex h-9 w-9 items-center justify-center
                rounded-xl
                border border-sidebar-border
                bg-sidebar
                text-sidebar-foreground
                hover:bg-sidebar-accent
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Application */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AppNavbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="docmind-scrollbar min-w-0 flex-1 overflow-x-hidden">
          <div className="px-3 py-6 sm:px-6 lg:px-10 xl:px-12">{children}</div>
        </main>
      </div>
    </main>
  );
}
