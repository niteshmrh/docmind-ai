export interface Document {
  id: string;
  originalName: string;
  status: 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';
  type: string;
  size: number;
  createdAt: string;
}
