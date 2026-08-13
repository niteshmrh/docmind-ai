'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle, MessageSquare, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import type { ChatSessionListItem } from '@/features/chat/types/chat.types';

interface RecentConversationsProps {
  sessions: ChatSessionListItem[];
}

export default function RecentConversations({ sessions }: RecentConversationsProps) {
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <Card className="docmind-card-hover overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-6">
          <div>
            <h2 className="font-heading text-lg font-semibold">Recent Conversations</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Continue your recent AI conversations
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-lg text-muted-foreground hover:text-primary"
          >
            <Link href="/chat">
              View all
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="p-4 sm:p-5">
          {recentSessions.length === 0 ? (
            <div
              className="
                flex flex-col items-center
                justify-center rounded-xl
                border border-dashed border-border
                px-6 py-12 text-center
              "
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-sm font-semibold">No conversations yet</h3>

              <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                Open a document and start asking questions with your AI assistant.
              </p>

              <Button className="mt-5 rounded-xl" size="sm" asChild>
                <Link href="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Chat
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {recentSessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/chat?sessionId=${session.id}`}
                  className="
                    group flex min-w-0
                    items-center justify-between
                    gap-3 rounded-xl
                    border border-transparent
                    p-3
                    transition-all duration-200
                    hover:border-primary/15
                    hover:bg-primary/[0.035]
                  "
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-xl bg-primary/10
                        text-primary
                      "
                    >
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{session.title}</p>

                      <p className="mt-1 truncate text-[11px] text-muted-foreground">
                        {session.document?.originalName ?? 'Document'}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs font-medium">{session._count?.messages ?? 0} messages</p>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
