import { Suspense } from 'react';

import LoginContent from './LoginContent';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
