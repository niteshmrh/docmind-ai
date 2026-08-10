'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import AuthService from '../api/auth.service';

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.register,

    onSuccess(response) {
      toast.success(response.data.message);
      router.push('/login');
    },

    onError(error: any) {
      toast.error(error?.response?.data?.message ?? 'Registration failed');
    },
  });
}
