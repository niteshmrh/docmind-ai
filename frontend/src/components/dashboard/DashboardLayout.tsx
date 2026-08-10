import { ReactNode } from 'react';

import AppSidebar from './AppSidebar';
import AppNavbar from './AppNavbar';
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="w-64 border-r bg-background">
        <AppSidebar />
      </aside>
      <main className="flex-1">
        <header className="h-16 border-b px-6 flex items-center">
          <AppNavbar />
        </header>
        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}
