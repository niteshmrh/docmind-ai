'use client';

import { Bell, Menu, Search, Sparkles } from 'lucide-react';

import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/common/ThemeToggle';
import UserMenu from './UserMenu';

interface AppNavbarProps {
  onMenuClick?: () => void;
}

export default function AppNavbar({ onMenuClick }: AppNavbarProps) {
  return (
    <header
      className="
        sticky top-0 z-40
        flex h-[76px] shrink-0 items-center gap-4
        border-b border-border
        bg-background/85
        px-4 backdrop-blur-xl
        sm:px-6
      "
    >
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl border border-border
          bg-card
          hover:border-primary/30
          hover:bg-primary/5
          lg:hidden
        "
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative w-full max-w-[520px]">
        <Search
          className="
            pointer-events-none absolute left-3.5 top-1/2
            h-4 w-4 -translate-y-1/2
            text-muted-foreground
          "
        />

        <Input
          type="search"
          placeholder="Search documents..."
          className="
            h-11 rounded-xl
            border-border
            bg-card/80
            pl-10
            text-sm
            shadow-none
            placeholder:text-muted-foreground/60
            focus-visible:border-primary/40
            focus-visible:ring-2
            focus-visible:ring-primary/10
          "
        />

        <div
          className="
            pointer-events-none absolute right-3
            top-1/2 hidden -translate-y-1/2
            rounded-md border border-border
            px-1.5 py-0.5 text-[10px]
            text-muted-foreground
            sm:block
          "
        >
          /
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* AI indicator */}
        {/* <div
          className="
            hidden items-center gap-2
            rounded-xl border border-primary/10
            bg-primary/5 px-3 py-2
            text-xs text-primary
            xl:flex
          "
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Ready
        </div> */}

        {/* Theme */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            relative flex h-10 w-10
            items-center justify-center
            rounded-xl border border-border
            bg-card
            hover:border-primary/30
            hover:bg-primary/5
          "
        >
          <Bell className="h-[18px] w-[18px]" />

          <span
            className="
              absolute right-2.5 top-2
              h-1.5 w-1.5
              rounded-full bg-primary
              ring-2 ring-card
            "
          />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
