'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import AuthService from '../api/auth.service';
import { useAuth } from '@/context/AuthContext';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: AuthService.updateProfile,

    onSuccess(response) {
      const user = response.data.result;

      // Update AuthContext and localStorage
      login(user);

      // Update cached /auth/me data
      queryClient.setQueryData(['auth', 'me'], user);

      toast.success(response.data.message ?? 'Profile updated successfully');
    },

    onError(error: any) {
      toast.error(error?.response?.data?.message ?? 'Unable to update profile');
    },
  });
}
