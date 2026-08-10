'use client';

import { FileText, Clock, CheckCircle } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { useDocuments } from '@/features/document/hooks/useDocuments';

import StatsCard from '@/components/dashboard/StatsCard';
import RecentDocuments from '@/components/dashboard/RecentDocuments';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: documents = [], isLoading } = useDocuments();
  const totalDocuments = documents.length;
  const processingDocuments = documents.filter(
    (document) => document.status === 'PROCESSING'
  ).length;
  const readyDocuments = documents.filter((document) => document.status === 'READY').length;

  return (
    <main className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-4xl font-bold">Welcome back, {user?.name} 👋</h1>
        <p className="mt-2 text-muted-foreground">
          Upload documents, manage knowledge, and chat with AI.
        </p>
      </div>
      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard title="Total Documents" value={isLoading ? 0 : totalDocuments} icon={FileText} />
        <StatsCard title="Processing" value={isLoading ? 0 : processingDocuments} icon={Clock} />
        <StatsCard title="Ready" value={isLoading ? 0 : readyDocuments} icon={CheckCircle} />
      </div>
      <RecentDocuments documents={documents} />
    </main>
  );
}
