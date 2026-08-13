'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';

import DocumentSearch from '@/features/document/components/DocumentSearch';
import DocumentList from '@/features/document/components/DocumentList';

import { useDocuments } from '@/features/document/hooks/useDocuments';
import { useDeleteDocument } from '@/features/document/hooks/useDeleteDocument';
import { useChatSessions } from '@/features/chat/hooks/useChatSessions';

export default function DocumentsPage() {
  const { data = [], isLoading } = useDocuments();

  const { data: sessions = [], isLoading: sessionsLoading } = useChatSessions();

  const deleteDocument = useDeleteDocument();

  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  const documents = useMemo(() => {
    return data.filter((document) => {
      const matchesSearch = document.originalName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === 'ALL' || document.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  const counts = useMemo(() => {
    return {
      all: data.length,

      ready: data.filter((document) => document.status === 'READY').length,

      processing: data.filter(
        (document) => document.status === 'PROCESSING' || document.status === 'UPLOADING'
      ).length,

      failed: data.filter((document) => document.status === 'FAILED').length,
    };
  }, [data]);

  if (isLoading) {
    return (
      <main className="docmind-page docmind-gradient min-h-full">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />

            <p className="mt-4 text-sm text-muted-foreground">Loading documents...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        docmind-page
        docmind-gradient
        min-h-full
        px-5
        py-7
        md:px-8
        md:py-8
        lg:px-10
      "
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
              Workspace
            </p>

            <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
              My Documents
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">Manage your uploaded documents.</p>
          </div>

          <Button asChild className="w-full rounded-xl sm:w-auto">
            <Link href="/documents/upload">Upload Document</Link>
          </Button>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}
        <div className="mb-4">
          <DocumentSearch value={search} onChange={setSearch} />
        </div>

        {/* =====================================================
            STATUS FILTERS
        ===================================================== */}
        <div className="mb-5 flex flex-wrap gap-2">
          {[
            {
              label: 'All',
              value: 'ALL',
              count: counts.all,
            },
            {
              label: 'Ready',
              value: 'READY',
              count: counts.ready,
            },
            {
              label: 'Processing',
              value: 'PROCESSING',
              count: counts.processing,
            },
            {
              label: 'Failed',
              value: 'FAILED',
              count: counts.failed,
            },
          ].map((filter) => (
            <Button
              key={filter.value}
              type="button"
              variant={status === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatus(filter.value)}
              className="rounded-xl"
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>

        {/* =====================================================
            DOCUMENTS
        ===================================================== */}
        {documents.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-border
              bg-card/50
              px-6
              py-14
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-muted
              "
            >
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>

            {data.length === 0 ? (
              <>
                <h2 className="mt-4 font-heading text-lg font-semibold">No documents yet</h2>

                <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                  Upload your first document to start using DocMind AI.
                </p>

                <Button asChild className="mt-5 rounded-xl">
                  <Link href="/documents/upload">Upload Document</Link>
                </Button>
              </>
            ) : (
              <>
                <h2 className="mt-4 font-heading text-lg font-semibold">No documents found</h2>

                <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                  Try changing your search or status filter.
                </p>

                <Button
                  variant="outline"
                  className="mt-5 rounded-xl"
                  onClick={() => {
                    setSearch('');
                    setStatus('ALL');
                  }}
                >
                  Clear Filters
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <DocumentList
              documents={documents}
              sessions={sessions}
              sessionsLoading={sessionsLoading}
              onDelete={(id) => deleteDocument.mutate(id)}
              isDeleting={deleteDocument.isPending}
            />
          </div>
        )}
      </div>
    </main>
  );
}
