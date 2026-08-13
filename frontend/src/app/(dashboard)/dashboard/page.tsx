'use client';

import Link from 'next/link';

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquare,
  Sparkles,
  Upload,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import StatsCard from '@/components/dashboard/StatsCard';
import RecentDocuments from '@/components/dashboard/RecentDocuments';
import RecentConversations from '@/components/dashboard/RecentConversations';

import { useAuth } from '@/context/AuthContext';

import { useDocuments } from '@/features/document/hooks/useDocuments';
import { useChatSessions } from '@/features/chat/hooks/useChatSessions';

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: documents = [], isLoading: documentsLoading } = useDocuments();

  const { data: sessions = [], isLoading: sessionsLoading } = useChatSessions();

  const readyDocuments = documents.filter((document) => document.status === 'READY');

  const processingDocuments = documents.filter(
    (document) => document.status === 'PROCESSING' || document.status === 'UPLOADING'
  );

  return (
    <main className="docmind-page docmind-gradient min-h-full">
      <div className="mx-auto w-full max-w-[1500px] space-y-7 px-1 py-2 sm:space-y-8">
        {/* =================================================
            HERO
        ================================================= */}
        <section
          className="
            relative overflow-hidden
            rounded-3xl
            border border-primary/10
            bg-gradient-to-br
            from-primary/[0.10]
            via-card
            to-card
            p-6
            sm:p-8
          "
        >
          {/* Background glow */}
          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              h-64 w-64 rounded-full
              bg-primary/10 blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute
              bottom-[-100px] left-1/3
              h-48 w-48 rounded-full
              bg-violet-500/5 blur-3xl
            "
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div
                className="
                  mb-3 inline-flex items-center gap-2
                  rounded-full border border-primary/15
                  bg-primary/5 px-3 py-1.5
                  text-[11px] font-medium
                  text-primary
                "
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI Knowledge Assistant
              </div>

              <h1
                className="
                  font-heading text-3xl font-bold
                  tracking-tight sm:text-4xl
                "
              >
                Welcome back, {user?.name ?? 'there'} 👋
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Your intelligent workspace for managing documents, building knowledge, and chatting
                with AI.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                asChild
                className="rounded-xl border-border bg-background/50"
              >
                <Link href="/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Open AI Chat
                </Link>
              </Button>

              <Button
                asChild
                className="
                  rounded-xl
                  shadow-lg shadow-primary/20
                "
              >
                <Link href="/documents/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* =================================================
            STATS
        ================================================= */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Documents"
            value={documentsLoading ? '—' : documents.length}
            description="All uploaded documents"
            icon={FileText}
            accent="purple"
          />

          <StatsCard
            title="Ready Documents"
            value={documentsLoading ? '—' : readyDocuments.length}
            description="Ready for AI conversations"
            icon={CheckCircle2}
            accent="green"
          />

          <StatsCard
            title="Processing"
            value={documentsLoading ? '—' : processingDocuments.length}
            description="Currently being processed"
            icon={Clock3}
            accent="orange"
          />

          <StatsCard
            title="Conversations"
            value={sessionsLoading ? '—' : sessions.length}
            description="AI conversations"
            icon={MessageSquare}
            accent="blue"
          />
        </section>

        {/* =================================================
            CONTENT
        ================================================= */}
        <section className="grid gap-6 xl:grid-cols-2">
          {documentsLoading ? <DashboardCardSkeleton /> : <RecentDocuments documents={documents} />}

          {sessionsLoading ? (
            <DashboardCardSkeleton />
          ) : (
            <RecentConversations sessions={sessions} />
          )}
        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold">Quick Actions</h2>

              <p className="mt-1 text-sm text-muted-foreground">Get things done faster.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <QuickAction
              href="/documents/upload"
              icon={Upload}
              title="Upload Document"
              description="Add a new document to your knowledge base."
            />

            <QuickAction
              href="/documents"
              icon={FileText}
              title="Manage Documents"
              description="Search, organize and manage your files."
            />

            <QuickAction
              href="/chat"
              icon={Sparkles}
              title="Ask AI"
              description="Start a conversation with your documents."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="
        group relative overflow-hidden
        rounded-2xl border border-border
        bg-card p-5
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-primary/25
        hover:shadow-xl
        hover:shadow-primary/5
      "
    >
      <div
        className="
          absolute right-0 top-0
          h-24 w-24 rounded-full
          bg-primary/5 blur-2xl
          transition-opacity
          group-hover:opacity-100
        "
      />

      <div className="relative">
        <div
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            bg-primary/10
            text-primary
            transition-all
            group-hover:bg-primary
            group-hover:text-primary-foreground
          "
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
          </div>

          <ArrowRight
            className="
              h-4 w-4 shrink-0
              text-muted-foreground
              transition-all
              group-hover:translate-x-1
              group-hover:text-primary
            "
          />
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function DashboardCardSkeleton() {
  return (
    <div
      className="
        animate-pulse rounded-2xl
        border border-border
        bg-card p-6
      "
    >
      <div className="h-5 w-40 rounded-md bg-muted" />

      <div className="mt-2 h-3 w-60 rounded-md bg-muted" />

      <div className="mt-7 space-y-3">
        <div className="h-16 rounded-xl bg-muted" />
        <div className="h-16 rounded-xl bg-muted" />
        <div className="h-16 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
