import { Suspense } from 'react';

import RegisterContent from './RegisterContent';

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </main>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
