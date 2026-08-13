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
    <main className="docmind-page docmind-gradient min-h-full px-4 py-6">
      <div className="mx-auto max-w-5xl">
        {/* =================================================
            HEADER
        ================================================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-primary">
              Document Management
            </p>

            <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Upload Document
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Upload a document to start asking questions and chatting with your knowledge base.
            </p>
          </div>
        </div>

        {/* =================================================
            UPLOAD AREA
        ================================================= */}
        <div className="mt-8">
          {!file && <UploadDropzone onFileSelect={setFile} />}

          {/* =================================================
              SELECTED FILE
          ================================================= */}
          {file && (
            <div
              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-5
                shadow-none
              "
            >
              {/* File */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                      text-primary
                    "
                  >
                    <FileText className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{file.name}</p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>

                      <span>•</span>

                      <span>Ready to upload</span>
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={uploadMutation.isPending}
                  onClick={handleRemoveFile}
                  title="Remove file"
                  className="
                    h-9
                    w-9
                    shrink-0
                    rounded-lg
                    text-muted-foreground
                    hover:bg-red-500/10
                    hover:text-red-500
                  "
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-border" />

              {/* Success */}
              {uploadMutation.isSuccess && (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/5
                    px-4
                    py-3
                    text-sm
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />

                  <span>Document uploaded successfully.</span>
                </div>
              )}

              {/* Upload */}
              {!uploadMutation.isSuccess && (
                <Button
                  className="
                    h-10
                    w-full
                    rounded-lg
                    sm:w-auto
                    sm:min-w-[180px]
                  "
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending}
                >
                  {uploadMutation.isPending ? (
                    <>
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Upload Document
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            CHANGE FILE
        ================================================= */}
        {file && !uploadMutation.isPending && (
          <button
            type="button"
            onClick={() => setFile(null)}
            className="
              mx-auto
              mt-4
              block
              text-sm
              text-muted-foreground
              transition-colors
              hover:text-primary
              hover:underline
            "
          >
            Choose a different file
          </button>
        )}

        {/* =================================================
            HELP
        ================================================= */}
        {!file && (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-border/60
              bg-muted/20
              px-4
              py-3
              text-center
              text-xs
              text-muted-foreground
            "
          >
            Maximum file size and supported formats are enforced automatically.
          </div>
        )}
      </div>
    </main>
  );
}
