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
      <main className="p-8">
        <p className="text-muted-foreground">Loading documents...</p>
      </main>
    );
  }

  return (
    <main className="space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Documents</h1>

          <p className="mt-1 text-sm text-muted-foreground">Manage your uploaded documents.</p>
        </div>

        <Button asChild className="w-full md:w-auto">
          <Link href="/documents/upload">Upload Document</Link>
        </Button>
      </div>

      {/* Search */}
      <DocumentSearch value={search} onChange={setSearch} />

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
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
          >
            {filter.label} ({filter.count})
          </Button>
        ))}
      </div>

      {/* Documents */}
      {documents.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>

          {data.length === 0 ? (
            <>
              <h2 className="mt-4 text-lg font-semibold">No documents yet</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Upload your first document to start using DocMind AI.
              </p>

              <Button asChild className="mt-5">
                <Link href="/documents/upload">Upload Document</Link>
              </Button>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-lg font-semibold">No documents found</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or status filter.
              </p>

              <Button
                variant="outline"
                className="mt-5"
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
        <DocumentList
          documents={documents}
          sessions={sessions}
          sessionsLoading={sessionsLoading}
          onDelete={(id) => deleteDocument.mutate(id)}
          isDeleting={deleteDocument.isPending}
        />
      )}
    </main>
  );
}
