import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
