import api from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import { Document } from '../types/document.types';

const DocumentService = {
  getAll() {
    return api.get<ApiResponse<Document[]>>('/documents');
  },

  getById(id: string) {
    return api.get<ApiResponse<Document>>(`/documents/${id}`);
  },

  upload(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return api.post<ApiResponse<Document>>('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  delete(id: string) {
    return api.delete(`/documents/${id}`);
  },
};

export default DocumentService;
