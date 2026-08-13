'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserCircle,
  Upload,
  LogOut,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/common/Logo';

interface AppSidebarProps {
  onNavigate?: () => void;
}

const navigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Documents',
    href: '/documents',
    icon: FileText,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Upload',
    href: '/documents/upload',
    icon: Upload,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: UserCircle,
  },
];

export default function AppSidebar({ onNavigate }: AppSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate?.();
  };

  return (
    <aside
      className="
        flex h-full w-[250px] flex-col
        border-r border-sidebar-border
        bg-sidebar
      "
    >
      {/* Logo */}
      <div
        className="
          flex h-[76px] shrink-0 items-center
          border-b border-sidebar-border
          px-5
        "
      >
        <Logo href="/dashboard" />
      </div>

      {/* Navigation */}
      <nav className="docmind-scrollbar flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  `
                    group flex items-center gap-3
                    rounded-xl px-3.5 py-3
                    text-sm font-medium
                    transition-all duration-200
                  `,
                  isActive
                    ? `
                      bg-primary/15
                      text-primary
                      shadow-sm
                      ring-1 ring-primary/10
                    `
                    : `
                      text-sidebar-foreground/65
                      hover:bg-sidebar-accent
                      hover:text-sidebar-accent-foreground
                    `
                )}
              >
                <Icon
                  className={cn(
                    'h-[18px] w-[18px] shrink-0',
                    isActive
                      ? 'text-primary'
                      : 'text-sidebar-foreground/55 group-hover:text-primary'
                  )}
                />

                <span>{item.title}</span>

                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-xl px-3.5 py-3
            text-sm font-medium
            text-sidebar-foreground/60
            hover:bg-red-500/10
            hover:text-red-500
          "
        >
          <LogOut className="h-[18px] w-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
