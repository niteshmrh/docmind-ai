'use client';

import { useQuery } from '@tanstack/react-query';
import DocumentService from '../api/document.service';

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await DocumentService.getAll();
      return response.data.result;
    },
  });
}
