import { LayoutDashboard, FileText, Upload, MessageSquare, Settings } from 'lucide-react';

export const navigation = [
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
    title: 'Upload',
    href: '/documents/upload',
    icon: Upload,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];
