'use client';

import Link from 'next/link';
import {
  ArrowRight,
  File,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import StatusBadge from '@/features/document/components/StatusBadge';
import type { Document } from '@/features/document/types/document.types';

interface RecentDocumentsProps {
  documents: Document[];
}

function DocumentIcon({ extension }: { extension: Document['extension'] }) {
  if (extension === 'PDF') {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
        <FileText className="h-5 w-5" />
      </div>
    );
  }

  if (extension === 'XLSX' || extension === 'CSV') {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
        <FileSpreadsheet className="h-5 w-5" />
      </div>
    );
  }

  if (extension === 'IMAGE') {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
        <ImageIcon className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <File className="h-5 w-5" />
    </div>
  );
}

export default function RecentDocuments({ documents }: RecentDocumentsProps) {
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card className="docmind-card-hover overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-6">
          <div>
            <h2 className="font-heading text-lg font-semibold">Recent Documents</h2>

            <p className="mt-1 text-xs text-muted-foreground">Your latest uploaded files</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-lg text-muted-foreground hover:text-primary"
          >
            <Link href="/documents">
              View all
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {recentDocuments.length === 0 ? (
            <div
              className="
                flex flex-col items-center
                justify-center rounded-xl
                border border-dashed border-border
                px-6 py-12 text-center
              "
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-sm font-semibold">No documents yet</h3>

              <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                Upload your first document to start building your AI knowledge base.
              </p>

              <Button className="mt-5 rounded-xl" size="sm" asChild>
                <Link href="/documents/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {recentDocuments.map((document) => (
                <Link
                  key={document.id}
                  href="/documents"
                  className="
                    group flex min-w-0 items-center
                    justify-between gap-3
                    rounded-xl border border-transparent
                    p-3
                    transition-all duration-200
                    hover:border-primary/15
                    hover:bg-primary/[0.035]
                  "
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <DocumentIcon extension={document.extension} />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{document.originalName}</p>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{document.extension}</span>

                        <span>•</span>

                        <span>{new Date(document.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={document.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
