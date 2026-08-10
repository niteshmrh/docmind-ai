import Link from 'next/link';
import { FileText, MessageSquare, Trash2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import StatusBadge from '@/features/document/components/StatusBadge';
import { Document } from '@/features/document/types/document.types';

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
}

export default function DocumentCard({ document, onDelete }: DocumentCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <FileText className="h-10 w-10 text-primary" />

          <div>
            <h3 className="font-semibold">{document.originalName}</h3>

            <p className="text-sm text-muted-foreground">{(document.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={document.status} />

          <Button asChild disabled={document.status !== 'READY'}>
            <Link href={`/chat?documentId=${document.id}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Link>
          </Button>

          <Button variant="destructive" size="icon" onClick={() => onDelete?.(document.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
