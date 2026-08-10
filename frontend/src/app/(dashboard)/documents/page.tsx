'use client';

import { useMemo, useState } from 'react';

import DocumentSearch from '@/features/document/components/DocumentSearch';
import DocumentList from '@/features/document/components/DocumentList';
import { useDocuments } from '@/features/document/hooks/useDocuments';
import { useDeleteDocument } from '@/features/document/hooks/useDeleteDocument';

export default function DocumentsPage() {
  const { data = [], isLoading } = useDocuments();
  const deleteDocument = useDeleteDocument();

  const [search, setSearch] = useState('');

  const documents = useMemo(() => {
    return data.filter((document) =>
      document.originalName.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (isLoading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <main className="space-y-6 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">My Documents</h1>
        <DocumentSearch value={search} onChange={setSearch} />
      </div>
      <DocumentList documents={documents} onDelete={(id) => deleteDocument.mutate(id)} />
    </main>
  );
}
