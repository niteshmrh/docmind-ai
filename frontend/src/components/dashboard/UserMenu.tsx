'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { useAuth } from '@/context/AuthContext';

export default function UserMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const initials =
    user?.name
      ?.split(' ')
      .filter(Boolean)
      .map((name) => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'U';

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="
            flex items-center gap-2
            rounded-xl px-2 py-1.5
            outline-none
            hover:bg-accent
            focus-visible:ring-2
            focus-visible:ring-primary/30
          "
        >
          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback
              className="
                bg-primary/10
                text-primary
                font-semibold
              "
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden min-w-0 text-left md:block">
            <p className="max-w-32 truncate text-sm font-semibold">{user?.name ?? 'User'}</p>

            <p className="max-w-36 truncate text-[11px] text-muted-foreground">
              {user?.email ?? ''}
            </p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 rounded-xl border-border p-1.5"
      >
        <div className="px-3 py-2">
          <p className="text-sm font-semibold">{user?.name ?? 'User'}</p>

          <p className="truncate text-xs text-muted-foreground">{user?.email ?? ''}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/profile')} className="rounded-lg">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/settings')} className="rounded-lg">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="
            rounded-lg
            text-red-500
            focus:bg-red-500/10
            focus:text-red-500
          "
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
