'use client';

import Link from 'next/link';
import { FileText, MessageSquare } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import StatusBadge from './StatusBadge';
import DeleteDocumentDialog from './DeleteDocumentDialog';

import { Document } from '../types/document.types';
import { ChatSessionListItem } from '@/features/chat/types/chat.types';

interface Props {
  document: Document;
  chatSession?: ChatSessionListItem;
  sessionsLoading?: boolean;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export default function DocumentCard({
  document,
  chatSession,
  sessionsLoading = false,
  onDelete,
  isDeleting = false,
}: Props) {
  const chatHref = chatSession
    ? `/chat?sessionId=${chatSession.id}`
    : `/chat?documentId=${document.id}`;

  const chatLabel = sessionsLoading ? 'Chat' : chatSession ? 'Continue Chat' : 'Open Chat';

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Document information */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-medium">{document.originalName}</p>

              <p className="text-xs text-muted-foreground">
                {new Date(document.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2">
            <StatusBadge status={document.status} />

            <Button asChild size="sm" disabled={document.status !== 'READY'}>
              <Link href={chatHref}>
                <MessageSquare className="mr-2 h-4 w-4" />
                {chatLabel}
              </Link>
            </Button>

            <DeleteDocumentDialog
              onConfirm={() => onDelete?.(document.id)}
              isDeleting={isDeleting}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
