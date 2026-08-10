'use client';

import DocumentCard from './DocumentCard';
import { Document } from '../types/document.types';

interface Props {
  documents: Document[];
  onDelete?: (id: string) => void;
}

export default function DocumentList({ documents, onDelete }: Props) {
  if (!documents.length) {
    return (
      <div className="flex h-80 flex-col items-center justify-center rounded-lg border border-dashed">
        <h2 className="text-xl font-semibold">No Documents Found</h2>
        <p className="mt-2 text-muted-foreground">Upload your first document to begin chatting.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} onDelete={onDelete} />
      ))}
    </div>
  );
}
