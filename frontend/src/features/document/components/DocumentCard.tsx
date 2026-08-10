import Link from 'next/link';
import { FileText } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import StatusBadge from './StatusBadge';
import { Document } from '../types/document.types';

interface Props {
  document: Document;
  onDelete?: (id: string) => void;
}

export default function DocumentCard({ document, onDelete }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <FileText className="h-10 w-10 text-primary" />

          <div>
            <h3 className="font-semibold">{document.originalName}</h3>

            <p className="text-sm text-muted-foreground">{(document.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={document.status} />

          <Button asChild disabled={document.status !== 'READY'}>
            <Link href={`/chat?documentId=${document.id}`}>Open Chat</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
