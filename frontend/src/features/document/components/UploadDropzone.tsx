'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CheckCircle2, FileUp, UploadCloud } from 'lucide-react';

import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants/upload';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadDropzone({ onFileSelect }: UploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_FILE_TYPES,
    onDrop,
  });

  const rejectionMessage = fileRejections.length > 0 ? fileRejections[0].errors[0]?.message : null;

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          cursor-pointer rounded-xl border-2 border-dashed p-10
          text-center transition-all duration-200
          ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : isDragReject
                ? 'border-destructive bg-destructive/10'
                : 'border-muted hover:border-primary/50 hover:bg-muted/30'
          }
        `}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <UploadCloud className="mx-auto mb-4 h-12 w-12 text-primary" />
        ) : (
          <FileUp className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        )}

        <h3 className="font-semibold">
          {isDragActive ? 'Drop your document here' : 'Drag & Drop your document'}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">or click to browse from your computer</p>

        <p className="mt-4 text-xs text-muted-foreground">PDF, DOCX, TXT, CSV, XLSX</p>
      </div>

      {rejectionMessage && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <span>{rejectionMessage}</span>
        </div>
      )}
    </div>
  );
}
