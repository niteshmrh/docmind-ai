'use client';

import { Input } from '@/components/ui/input';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function DocumentSearch({ value, onChange }: Props) {
  return (
    <Input
      placeholder="Search documents..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
