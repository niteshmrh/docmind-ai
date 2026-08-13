'use client';

import { useQuery } from '@tanstack/react-query';

import DocumentService from '@/features/document/api/document.service';

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],

    queryFn: async () => {
      const response = await DocumentService.getDocuments();

      return response.data.result;
    },

    refetchInterval: (query) => {
      const documents = query.state.data;

      const hasProcessingDocuments = documents?.some(
        (document) => document.status === 'UPLOADING' || document.status === 'PROCESSING'
      );

      return hasProcessingDocuments ? 3000 : false;
    },
  });
}
