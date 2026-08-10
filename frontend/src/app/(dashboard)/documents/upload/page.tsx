'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import UploadDropzone from '@/features/document/components/UploadDropzone';
import { useUploadDocument } from '@/features/document/hooks/useUploadDocument';

export default function UploadPage() {
  const router = useRouter();

  const uploadMutation = useUploadDocument();

  const [file, setFile] = useState<File | null>(null);

  function handleUpload() {
    if (!file) return;

    uploadMutation.mutate(file, {
      onSuccess: () => {
        router.push('/documents');
      },
    });
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Upload Document</h1>

      <UploadDropzone onFileSelect={setFile} />

      {file && (
        <div className="mt-6 rounded-lg border p-4">
          <p>
            <strong>Name:</strong> {file.name}
          </p>

          <p>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>

          <Button className="mt-5" onClick={handleUpload} disabled={uploadMutation.isPending}>
            {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      )}
    </main>
  );
}
