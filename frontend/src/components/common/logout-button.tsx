'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
