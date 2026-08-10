import { useQuery } from '@tanstack/react-query';
import DocumentService from '../api/document.service';

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],

    queryFn: async () => {
      const response = await DocumentService.getDocuments();
      return response.data.result;
    },

    refetchInterval: (query) => {
      const docs = query.state.data ?? [];
      return docs.some((doc) => doc.status === 'PROCESSING') ? 3000 : false;
    },
  });
}
