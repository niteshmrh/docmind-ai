'use client';

import { ReactNode } from 'react';

import QueryProvider from './query-provider';
import { ThemeProvider } from './theme-provider';
import SonnerProvider from './sonner-provider';

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
        <SonnerProvider />
      </QueryProvider>
    </ThemeProvider>
  );
}
