'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import DocumentService from '@/features/document/api/document.service';

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => DocumentService.uploadDocument(file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
    },
  });
}
