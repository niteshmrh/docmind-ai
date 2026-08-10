'use client';

import { Bell } from 'lucide-react';

import { Input } from '@/components/ui/input';

import UserMenu from './UserMenu';

export default function AppNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="w-full max-w-md">
        <Input placeholder="Search documents..." />
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 transition hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
