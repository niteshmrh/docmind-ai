'use client';

import { useDocuments } from '@/features/document/hooks/useDocuments';

export default function DocumentsPage() {
  const { data: documents, isLoading } = useDocuments();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      <div className="space-y-4">
        {documents?.map((document) => (
          <div key={document.id} className="rounded-lg border p-5">
            <h2 className="font-semibold">{document.originalName}</h2>

            <p>{document.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
