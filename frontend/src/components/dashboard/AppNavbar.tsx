'use client';

import { Bell } from 'lucide-react';

import { Input } from '@/components/ui/input';
import UserMenu from './UserMenu';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function AppNavbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      {/* Search */}
      <div className="w-full max-w-md">
        <Input type="search" placeholder="Search documents..." className="h-9" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="ml-6 flex shrink-0 items-center gap-4">
          <button
            type="button"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
