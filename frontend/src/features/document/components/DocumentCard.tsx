'use client';

import Link from 'next/link';
import { File, FileSpreadsheet, FileText, Image as ImageIcon, MessageSquare } from 'lucide-react';

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

function DocumentIcon({ extension }: { extension: Document['extension'] }) {
  switch (extension) {
    case 'PDF':
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
          <FileText className="h-5 w-5" />
        </div>
      );

    case 'XLSX':
    case 'CSV':
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
          <FileSpreadsheet className="h-5 w-5" />
        </div>
      );

    case 'IMAGE':
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <ImageIcon className="h-5 w-5" />
        </div>
      );

    default:
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <File className="h-5 w-5" />
        </div>
      );
  }
}

export default function DocumentCard({
  document,
  chatSession,
  sessionsLoading = false,
  onDelete,
  isDeleting = false,
}: Props) {
  // Keep existing chat logic
  const chatHref = chatSession
    ? `/chat?sessionId=${chatSession.id}`
    : `/chat?documentId=${document.id}`;

  const chatLabel = sessionsLoading ? 'Chat' : chatSession ? 'Continue Chat' : 'Open Chat';

  const isReady = document.status === 'READY';

  return (
    <Card
      className="
        rounded-xl
        border-border
        bg-card
        shadow-none
        transition-colors
        hover:border-primary/20
        hover:bg-card/80
      "
    >
      <CardContent className="p-0">
        <div
          className="
            grid
            grid-cols-1
            gap-4
            px-4 py-4

            md:grid-cols-[minmax(0,1fr)_90px_100px_auto_44px]
            md:items-center
            md:gap-4
            md:px-5
          "
        >
          {/* Document */}
          <div className="flex min-w-0 items-center gap-3">
            <DocumentIcon extension={document.extension} />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{document.originalName}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Uploaded {new Date(document.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Type */}
          <div className="hidden md:block">
            <p className="text-xs font-medium text-muted-foreground">Type</p>

            <p className="mt-1 text-sm">{document.extension}</p>
          </div>

          {/* Status */}
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground md:hidden">Status</p>

            <StatusBadge status={document.status} />
          </div>

          {/* Chat */}
          <div>
            <Button
              asChild={isReady}
              size="sm"
              disabled={!isReady}
              className="
                h-9
                w-full
                rounded-lg
                md:w-auto
              "
            >
              {isReady ? (
                <Link href={chatHref}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {chatLabel}
                </Link>
              ) : (
                <span>
                  <MessageSquare className="mr-2 inline h-4 w-4" />
                  {chatLabel}
                </span>
              )}
            </Button>
          </div>

          {/* Delete */}
          <div className="flex justify-end">
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
