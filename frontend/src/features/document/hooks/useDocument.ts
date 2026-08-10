'use client';

import { useQuery } from '@tanstack/react-query';
import DocumentService from '../api/document.service';

export function useDocument(id: string) {
  return useQuery({
    queryKey: ['document', id],

    queryFn: async () => {
      const response = await DocumentService.getDocument(id);

      return response.data.result;
    },

    enabled: !!id,
  });
}
