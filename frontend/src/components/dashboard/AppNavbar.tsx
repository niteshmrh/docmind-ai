'use client';

import { useAuth } from '@/context/AuthContext';

export default function AppNavbar() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="font-semibold text-lg">DocMind AI</h2>

      <div>{user?.name}</div>
    </div>
  );
}
