import api from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import { Document } from '../types/document.types';

const DocumentService = {
  getDocuments() {
    return api.get<ApiResponse<Document[]>>('/documents');
  },

  getDocument(id: string) {
    return api.get<ApiResponse<Document>>(`/documents/${id}`);
  },

  uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<ApiResponse<Document>>('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteDocument(id: string) {
    return api.delete<ApiResponse<null>>(`/documents/${id}`);
  },
};

export default DocumentService;
