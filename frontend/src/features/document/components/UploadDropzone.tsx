'use client';

interface Props {
  onSelect(file: File): void;
}

export default function UploadDropzone({ onSelect }: Props) {
  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onSelect(file);
      }}
    />
  );
}
