'use client';

import Link from 'next/link';
import { CheckCircle2, Clock3, FileText, MessageSquare, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useAuth } from '@/context/AuthContext';
import { useDocuments } from '@/features/document/hooks/useDocuments';
import { useChatSessions } from '@/features/chat/hooks/useChatSessions';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: documents = [], isLoading } = useDocuments();
  const { data: sessions = [], isLoading: sessionsLoading } = useChatSessions();

  const readyDocuments = documents.filter((document) => document.status === 'READY');

  const processingDocuments = documents.filter(
    (document) => document.status === 'PROCESSING' || document.status === 'UPLOADING'
  );

  return (
    <main className="space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name ?? 'there'} 👋</h1>

          <p className="mt-2 text-muted-foreground">
            Upload documents, manage knowledge, and chat with AI.
          </p>
        </div>

        <Button asChild>
          <Link href="/documents/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Documents"
          value={isLoading ? '—' : documents.length}
          icon={FileText}
        />

        <StatCard
          title="Ready Documents"
          value={isLoading ? '—' : readyDocuments.length}
          icon={CheckCircle2}
        />

        <StatCard
          title="Processing"
          value={isLoading ? '—' : processingDocuments.length}
          icon={Clock3}
        />

        <StatCard
          title="Conversations"
          value={sessionsLoading ? '—' : sessions.length}
          icon={MessageSquare}
        />
      </div>

      {/* Recent documents */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Documents</h2>

              <p className="text-sm text-muted-foreground">Your latest uploaded documents</p>
            </div>

            <Button variant="ghost" asChild>
              <Link href="/documents">View all</Link>
            </Button>
          </div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading documents...</p>
          ) : documents.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

              <p className="font-medium">No documents yet</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Upload your first document to get started.
              </p>

              <Button className="mt-4" asChild>
                <Link href="/documents/upload">Upload Document</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.slice(0, 5).map((document) => (
                <Link
                  key={document.id}
                  href={`/documents/${document.id}`}
                  className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">{document.originalName}</p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(document.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      document.status === 'READY'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : document.status === 'PROCESSING' || document.status === 'UPLOADING'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {document.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat conversations */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Conversations</h2>

              <p className="text-sm text-muted-foreground">Continue your recent chats.</p>
            </div>

            <Button variant="ghost" asChild>
              <Link href="/chat">View all</Link>
            </Button>
          </div>

          {sessionsLoading ? (
            <p className="text-sm text-muted-foreground">Loading conversations...</p>
          ) : sessions.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <MessageSquare className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

              <p className="font-medium">No conversations yet</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Start a chat with one of your documents.
              </p>

              <Button className="mt-4" asChild>
                <Link href="/chat">Start Chat</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => (
                <Link
                  key={session.id}
                  href={`/chat?sessionId=${session.id}`}
                  className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">{session.title}</p>

                      <p className="truncate text-xs text-muted-foreground">
                        {session.document?.originalName ?? 'Document'}
                      </p>
                    </div>
                  </div>

                  <div className="ml-4 shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">
                      {session._count?.messages ?? 0} messages
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Upload and Chats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/documents/upload"
          className="rounded-xl border p-6 transition-colors hover:bg-muted/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Upload className="h-5 w-5 text-primary" />
          </div>

          <h3 className="mt-4 font-semibold">Upload Document</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Add a new document to your AI knowledge base.
          </p>
        </Link>

        <Link href="/chat" className="rounded-xl border p-6 transition-colors hover:bg-muted/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>

          <h3 className="mt-4 font-semibold">Open AI Chat</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Continue a conversation with your documents.
          </p>
        </Link>
      </div>
    </main>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
