'use client';

import React from 'react';

import PageBackground from './PageBackground';
import ThemeToggle from './ThemeToggle';

export function AppBackground({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <PageBackground />

      <div className="relative z-10">{children}</div>

      <ThemeToggle />
    </main>
  );
}

export { default as ThemeToggle } from './ThemeToggle';
