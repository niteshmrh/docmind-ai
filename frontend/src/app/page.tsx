import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  FileText,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
} from 'lucide-react';

import ThemeToggle from '@/components/common/ThemeToggle';

const features = [
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'Upload your documents and turn them into searchable, AI-ready knowledge.',
  },
  {
    icon: MessageSquare,
    title: 'AI-Powered Chat',
    description: 'Ask questions about your documents and get contextual answers instantly.',
  },
  {
    icon: Search,
    title: 'RAG-Powered Search',
    description:
      'Find relevant information using intelligent retrieval instead of manual searching.',
  },
  {
    icon: Brain,
    title: 'Smart Conversations',
    description: 'Continue conversations with persistent chat history for each document.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description: 'Protected accounts with JWT authentication and secure password handling.',
  },
  {
    icon: Sparkles,
    title: 'AI Ready',
    description: 'Designed to work with local LLMs during development and production AI providers.',
  },
];

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload',
    description: 'Upload your documents to DocMind AI.',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Process',
    description: 'Your documents are processed and prepared for intelligent search.',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Ask',
    description: 'Ask questions and interact with your document knowledge.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="h-5 w-5" />
            </div>

            <span className="text-xl font-bold tracking-tight">DocMind AI</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
          </nav>

          {/* <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium transition-colors hover:text-primary sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div> */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="hidden text-sm font-medium transition-colors hover:text-primary sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_40%)]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-24 text-center md:pb-32 md:pt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Intelligent document conversations
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Your documents.
            <br />
            <span className="text-primary">Your knowledge.</span>
            <br />
            Powered by AI.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Upload your documents, ask questions, and discover insights through an intelligent
            AI-powered document assistant.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start using DocMind AI
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-lg border px-6 font-medium transition-colors hover:bg-muted"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Features</p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to work with your documents
            </h2>

            <p className="mt-4 text-muted-foreground">
              DocMind AI combines document processing, intelligent retrieval, and conversational AI
              in one workspace.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-background p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>

                  <p className="mt-2 leading-7 text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From document to insight in three steps
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-primary">{step.number}</p>

                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>

                  <p className="mx-auto mt-2 max-w-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to explore your documents differently?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Create your account and start turning your documents into intelligent, searchable
            knowledge.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nitesh Kumar. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/login" className="hover:text-foreground">
              Sign in
            </Link>

            <Link href="/register" className="hover:text-foreground">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
