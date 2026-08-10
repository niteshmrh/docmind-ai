'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '../../../constants/upload';

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_FILE_TYPES,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-lg border-2 border-dashed p-10 text-center cursor-pointer transition ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-muted'
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud className="mx-auto h-12 w-12 mb-4" />

      <h3 className="font-semibold">Drag & Drop your document</h3>

      <p className="text-sm text-muted-foreground mt-2">PDF, DOCX, TXT, CSV, XLSX</p>
    </div>
  );
}
