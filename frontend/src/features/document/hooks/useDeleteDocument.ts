'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import DocumentService from '../api/document.service';

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DocumentService.deleteDocument,

    onSuccess(response) {
      toast.success(response.data.message);

      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
    },

    onError(error: any) {
      toast.error(error?.response?.data?.message ?? 'Unable to delete document');
    },
  });
}
