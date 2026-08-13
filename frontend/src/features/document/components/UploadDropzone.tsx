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
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          group
          cursor-pointer
          rounded-2xl
          border-2
          border-dashed
          px-6
          py-14
          text-center
          transition-colors
          duration-200

          ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : isDragReject
                ? 'border-destructive bg-destructive/5'
                : 'border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02]'
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Icon */}
        <div
          className={`
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            transition-colors

            ${
              isDragActive
                ? 'bg-primary/15 text-primary'
                : isDragReject
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-primary/10 text-primary group-hover:bg-primary/15'
            }
          `}
        >
          {isDragActive ? <UploadCloud className="h-7 w-7" /> : <FileUp className="h-7 w-7" />}
        </div>

        {/* Heading */}
        <h3 className="mt-5 text-base font-semibold">
          {isDragActive ? 'Drop your document here' : 'Upload a document'}
        </h3>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Drag and drop your file here, or click to browse from your computer.
        </p>

        {/* Browse */}
        <div
          className="
            mx-auto
            mt-5
            inline-flex
            items-center
            rounded-lg
            border
            border-border
            bg-background
            px-4
            py-2
            text-sm
            font-medium
            transition-colors
            group-hover:border-primary/30
            group-hover:text-primary
          "
        >
          Choose File
        </div>

        {/* Supported formats */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />

          <span className="text-xs text-muted-foreground">PDF, DOCX, TXT, CSV, XLSX</span>
        </div>
      </div>

      {/* Rejection */}
      {rejectionMessage && (
        <div
          className="
            mt-3
            rounded-xl
            border
            border-destructive/20
            bg-destructive/5
            px-4
            py-3
            text-sm
            text-destructive
          "
        >
          {rejectionMessage}
        </div>
      )}
    </div>
  );
}
