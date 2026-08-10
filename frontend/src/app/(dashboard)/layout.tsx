import { ReactNode } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
