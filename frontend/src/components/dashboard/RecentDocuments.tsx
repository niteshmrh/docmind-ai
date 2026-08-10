'use client';

import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import StatusBadge from '@/features/document/components/StatusBadge';
import { Document } from '@/features/document/types/document.types';

interface RecentDocumentsProps {
  documents: Document[];
}

export default function RecentDocuments({ documents }: RecentDocumentsProps) {
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Documents</CardTitle>

        {documents.length > 0 && (
          <Button variant="ghost" asChild>
            <Link href="/documents">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {recentDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FileText className="mb-3 h-10 w-10 text-muted-foreground" />

            <p className="font-medium">No documents yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Upload your first document to get started.
            </p>

            <Button className="mt-4" asChild>
              <Link href="/documents/upload">Upload Document</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {recentDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-5 w-5 shrink-0 text-primary" />

                  <div className="min-w-0">
                    <p className="truncate font-medium">{document.originalName}</p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(document.createdAt).toLocaleDateString()} ·{' '}
                      {(document.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <StatusBadge status={document.status} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
