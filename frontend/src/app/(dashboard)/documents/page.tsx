'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { useDocuments } from '@/features/document/hooks/useDocuments';
import { useDeleteDocument } from '@/features/document/hooks/useDeleteDocument';
import DocumentCard from '@/features/document/components/DocumentCard';

export default function DocumentsPage() {
  const { data, isLoading } = useDocuments();

  const deleteDocument = useDeleteDocument();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents</h1>

        <Button asChild>
          <Link href="/documents/upload">Upload</Link>
        </Button>
      </div>

      {data?.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDelete={(id) => deleteDocument.mutate(id)}
        />
      ))}
    </main>
  );
}
