'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, FileText, Trash2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import UploadDropzone from '@/features/document/components/UploadDropzone';
import { useUploadDocument } from '@/features/document/hooks/useUploadDocument';

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function UploadPage() {
  const router = useRouter();

  const uploadMutation = useUploadDocument();

  const [file, setFile] = useState<File | null>(null);

  function handleUpload() {
    if (!file || uploadMutation.isPending) {
      return;
    }

    uploadMutation.mutate(file, {
      onSuccess: () => {
        toast.success('Document uploaded successfully');
        router.push('/documents');
      },

      onError: (error: any) => {
        toast.error(error?.response?.data?.message ?? 'Failed to upload document');
      },
    });
  }

  function handleRemoveFile() {
    if (uploadMutation.isPending) {
      return;
    }

    setFile(null);
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Upload Document</h1>

        <p className="mt-2 text-muted-foreground">
          Upload a document to start asking questions with DocMind AI.
        </p>
      </div>

      {/* Dropzone */}
      {!file && <UploadDropzone onFileSelect={setFile} />}

      {/* Selected file */}
      {file && (
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">{file.name}</p>

                <p className="mt-1 text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={uploadMutation.isPending}
              onClick={handleRemoveFile}
              title="Remove file"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          {/* Upload status */}
          {uploadMutation.isSuccess && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Document uploaded successfully.
            </div>
          )}

          {/* Upload button */}
          <Button
            className="mt-5 w-full"
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? (
              <>
                <UploadCloud className="mr-2 h-4 w-4 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </div>
      )}

      {/* Upload another file */}
      {file && !uploadMutation.isPending && (
        <button
          type="button"
          onClick={() => setFile(null)}
          className="mx-auto block text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Choose a different file
        </button>
      )}
    </main>
  );
}
