'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';

import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isInitialized, pathname, router]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* LEFT SIDEBAR */}
      <AppSidebar />

      {/* RIGHT SIDE */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* TOP NAVBAR */}
        <AppNavbar />

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
