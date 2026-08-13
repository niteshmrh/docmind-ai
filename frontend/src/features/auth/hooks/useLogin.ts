'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import AuthService from '../api/auth.service';
import { storage } from '@/utils/storage';
import { useAuth } from '@/context/AuthContext';

export function useLogin(redirect?: string | null) {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: AuthService.login,

    onSuccess(response) {
      const result = response.data.result;

      storage.setAccessToken(result.accessToken);
      storage.setRefreshToken(result.refreshToken);
      login(result.user);
      toast.success(response.data.message);
      const safeRedirect =
        redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/dashboard';
      router.push(safeRedirect);
    },

    onError(error: any) {
      toast.error(error?.response?.data?.message ?? 'Login failed');
    },
  });
}
