'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import AuthService from '../api/auth.service';
import { storage } from '@/utils/storage';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.login,

    onSuccess(response) {
      const result = response.data.result;
      storage.setAccessToken(result.accessToken);
      storage.setRefreshToken(result.refreshToken);
      toast.success(response.data.message);
      router.push('/dashboard');
    },

    onError(error: any) {
      toast.error(error?.response?.data?.message ?? 'Login failed');
    },
  });
}
