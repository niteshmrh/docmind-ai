'use client';

import { ReactNode } from 'react';

import QueryProvider from './query-provider';
import { ThemeProvider } from './theme-provider';
import SonnerProvider from './sonner-provider';

import { AuthProvider } from '@/context/AuthContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
          <SonnerProvider />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
