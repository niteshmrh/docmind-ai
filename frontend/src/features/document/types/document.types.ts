export type DocumentStatus = 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';

export type DocumentType = 'PDF' | 'DOCX' | 'TXT' | 'CSV' | 'XLSX' | 'IMAGE';

export interface Document {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  extension: string;
  size: number;
  status: DocumentStatus;
  type: DocumentType;
  createdAt: string;
  updatedAt: string;
}

export interface UploadResponse {
  document: Document;
}
