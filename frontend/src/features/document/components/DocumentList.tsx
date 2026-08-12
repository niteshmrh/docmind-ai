'use client';

import DocumentCard from './DocumentCard';

import { Document } from '../types/document.types';
import { ChatSessionListItem } from '@/features/chat/types/chat.types';

interface DocumentListProps {
  documents: Document[];
  sessions: ChatSessionListItem[];
  sessionsLoading?: boolean;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export default function DocumentList({
  documents,
  sessions,
  sessionsLoading = false,
  onDelete,
  isDeleting = false,
}: DocumentListProps) {
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
      {documents.map((document) => {
        const chatSession = sessions.find((item) => item.documentId === document.id);

        return (
          <DocumentCard
            key={document.id}
            document={document}
            chatSession={chatSession}
            sessionsLoading={sessionsLoading}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        );
      })}
    </div>
  );
}
