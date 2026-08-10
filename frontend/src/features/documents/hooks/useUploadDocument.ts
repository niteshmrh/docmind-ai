'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import DocumentService from '../api/document.service';

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DocumentService.upload,

    onSuccess(response) {
      toast.success(response.data.message);

      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
    },

    onError(error: any) {
      toast.error(error?.response?.data?.message ?? 'Upload failed');
    },
  });
}
