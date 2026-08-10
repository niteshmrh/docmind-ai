'use client';

import { useAuth } from '@/context/AuthContext';
import LogoutButton from '@/components/common/logout-button';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome {user?.name} 👋</h1>
        <p className="mt-4">{user?.email}</p>
      </div>
      <LogoutButton />
    </main>
  );
}
