'use client';

import { MessageSquare, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import NewChatDialog from './NewChatDialog';

import { ChatSessionListItem } from '../types/chat.types';
import { useDocuments } from '@/features/document/hooks/useDocuments';

interface ChatSidebarProps {
  sessions: ChatSessionListItem[];
  selectedSessionId?: string;
  isLoading?: boolean;
  documentId?: string;
  onSelect: (sessionId: string) => void;
  onCreateChat: (documentId: string, title: string) => Promise<void>;
  isCreating?: boolean;
  onDelete: (sessionId: string) => void;
}

export default function ChatSidebar({
  sessions,
  selectedSessionId,
  isLoading,
  documentId,
  onSelect,
  onCreateChat,
  isCreating,
  onDelete,
}: ChatSidebarProps) {
  const { data: documents = [] } = useDocuments();
  return (
    <aside className="h-full w-72 shrink-0 flex-col border-r bg-background md:flex">
      <div className="border-b p-4">
        <NewChatDialog documents={documents} onCreate={onCreateChat} isCreating={isCreating} />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <p className="p-4 text-sm text-muted-foreground">Loading conversations...</p>
        ) : sessions.length === 0 ? (
          <div className="p-4 text-center">
            <MessageSquare className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />

            <p className="text-sm font-medium">No conversations</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Start a new chat with one of your documents.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  'group flex items-center rounded-lg',
                  selectedSessionId === session.id ? 'bg-muted' : 'hover:bg-muted/60'
                )}
              >
                {/* <button
                  type="button"
                  onClick={() => onSelect(session.id)}
                  className="min-w-0 flex-1 px-3 py-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 shrink-0" />

                    <span className="truncate text-sm font-medium">{session.title}</span>
                  </div>

                  <p className="mt-1 truncate pl-6 text-xs text-muted-foreground">
                    {session.document.originalName}
                  </p>

                  <p className="mt-1 pl-6 text-xs text-muted-foreground">
                    {session._count.messages} messages
                  </p>
                </button> */}

                <button
                  key={session.id}
                  type="button"
                  onClick={() => onSelect(session.id)}
                  className={cn(
                    'w-full rounded-lg p-3 text-left transition-colors',
                    selectedSessionId === session.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{session.title}</p>
                      <p
                        className={cn(
                          'mt-1 truncate text-xs',
                          selectedSessionId === session.id
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        )}
                      >
                        {session.document?.originalName ?? 'Document'}
                      </p>
                      <p
                        className={cn(
                          'mt-1 text-xs',
                          selectedSessionId === session.id
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        )}
                      >
                        {session._count?.messages ?? 0} messages
                      </p>
                    </div>
                  </div>
                </button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-1 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => onDelete(session.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
