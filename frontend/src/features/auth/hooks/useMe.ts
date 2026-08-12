'use client';

import { useQuery } from '@tanstack/react-query';

import AuthService from '../api/auth.service';

export function useMe() {
  return useQuery({
    queryKey: ['auth', 'me'],

    queryFn: async () => {
      const response = await AuthService.me();

      return response.data.result;
    },
  });
}
