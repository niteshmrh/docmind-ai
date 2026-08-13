'use client';

import { MessageSquare, Plus, Trash2 } from 'lucide-react';

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
    <aside className="flex h-full min-h-0 flex-col">
      {/* Header */}
      {/* Header */}
      <div className="shrink-0 border-b border-border p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
              Workspace
            </p>

            <h2 className="mt-1 font-heading text-xl font-semibold">Conversations</h2>
          </div>

          <NewChatDialog documents={documents} onCreate={onCreateChat} isCreating={isCreating} />
        </div>

        <p className="mt-3 max-w-[220px] text-xs leading-5 text-muted-foreground">
          Ask questions and explore your uploaded documents.
        </p>
      </div>

      {/* Sessions */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-16 animate-pulse rounded-xl bg-muted/50" />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>

            <p className="mt-4 text-sm font-semibold">No conversations</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Start a new chat with one of your documents.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {sessions.map((session) => {
              const isSelected = selectedSessionId === session.id;

              return (
                <div
                  key={session.id}
                  className={cn(
                    'group relative rounded-xl transition-colors',
                    isSelected ? 'bg-primary/10' : 'hover:bg-muted/60'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(session.id)}
                    className="w-full rounded-xl p-3 text-left"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className={cn(
                          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0 flex-1 pr-6">
                        <p
                          className={cn(
                            'truncate text-sm font-medium',
                            isSelected && 'text-primary'
                          )}
                        >
                          {session.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {session.document?.originalName ?? 'Document'}
                        </p>

                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {session._count?.messages ?? 0} messages
                        </p>
                      </div>
                    </div>
                  </button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="
                      absolute
                      right-2
                      top-1/2
                      h-8
                      w-8
                      -translate-y-1/2
                      rounded-lg
                      text-muted-foreground
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                      hover:bg-destructive/10
                      hover:text-destructive
                    "
                    onClick={() => onDelete(session.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
