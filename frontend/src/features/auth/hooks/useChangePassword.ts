'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import AuthService from '../api/auth.service';
import { useAuth } from '@/context/AuthContext';

export function useChangePassword() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: AuthService.changePassword,

    onSuccess(response) {
      toast.success(response.data.message ?? 'Password changed successfully');

      logout();
    },

    onError(error: any) {
      toast.error(error?.response?.data?.message ?? 'Unable to change password');
    },
  });
}
