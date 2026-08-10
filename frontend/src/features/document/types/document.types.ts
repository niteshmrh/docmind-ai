export type DocumentStatus = 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';

export type DocumentType = 'PDF' | 'DOCX' | 'TXT' | 'CSV' | 'XLSX' | 'IMAGE';

export interface Document {
  id: string;
  userId: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  extension: DocumentType;
  size: number;
  path: string;
  status: DocumentStatus;
  type: string;
  createdAt: string;
}

export interface UploadResponse {
  document: Document;
}
