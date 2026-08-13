'use client';

import { FileText, FolderOpen, Sparkles } from 'lucide-react';

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
      <div
        className="
          relative overflow-hidden
          flex min-h-[360px]
          flex-col items-center
          justify-center
          rounded-2xl
          border border-dashed
          border-border
          bg-card
          px-6 py-16
          text-center
        "
      >
        {/* Decorative background */}
        <div
          className="
            pointer-events-none
            absolute -right-16 -top-16
            h-40 w-40
            rounded-full
            bg-primary/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute -bottom-20 -left-16
            h-40 w-40
            rounded-full
            bg-violet-500/5
            blur-3xl
          "
        />

        {/* Icon */}
        <div
          className="
            relative
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-primary/10
            text-primary
            ring-1 ring-primary/15
          "
        >
          <FolderOpen className="h-7 w-7" />

          <span
            className="
              absolute -right-1 -top-1
              flex h-5 w-5
              items-center justify-center
              rounded-full
              bg-primary
              text-primary-foreground
              shadow-lg
              shadow-primary/20
            "
          >
            <Sparkles className="h-3 w-3" />
          </span>
        </div>

        <h3 className="relative mt-5 font-heading text-lg font-semibold">No Documents Found</h3>

        <p className="relative mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Upload your first document to begin chatting with your AI knowledge assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((document) => {
        /*
         * IMPORTANT:
         * Keep the existing document → chat-session
         * relationship exactly as it is.
         */
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
