'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Check,
  FileText,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from 'lucide-react';

import Logo from '@/components/common/Logo';
import ThemeToggle from '@/components/common/ThemeToggle';
import PageBackground from '@/components/common/PageBackground';

const features = [
  {
    icon: Upload,
    title: 'Upload documents',
    description: 'Bring your PDFs and documents into one intelligent workspace.',
  },
  {
    icon: MessageSquare,
    title: 'Chat with your files',
    description: 'Ask questions naturally and get answers based on your documents.',
  },
  {
    icon: Search,
    title: 'Find information faster',
    description: 'Search through your knowledge without manually reading everything.',
  },
];

const benefits = [
  'AI-powered document conversations',
  'Persistent chat history',
  'Secure document workspace',
  'Fast semantic search',
];

export default function Home() {
  return (
    <main className="relative min-h-screen scroll-smooth overflow-hidden bg-background text-foreground">
      <PageBackground />

      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              How it works
            </a>

            <a
              href="#about"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-muted sm:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:scale-[1.02]"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-500">
              <Sparkles className="h-4 w-4" />
              AI-powered document intelligence
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your documents.
              <br />
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                Smarter.
              </span>{' '}
              Faster.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              Upload your documents, ask questions, search your knowledge, and get intelligent
              answers with DocMind AI.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 font-semibold text-white shadow-xl shadow-violet-600/20 transition hover:scale-[1.02]"
              >
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/login"
                className="flex h-12 items-center justify-center rounded-xl border border-border bg-background/60 px-6 font-semibold backdrop-blur transition hover:bg-muted"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 text-emerald-500" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PRODUCT PREVIEW */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-violet-600/20 to-blue-600/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-border/70 bg-card/70 p-4 shadow-2xl backdrop-blur-xl">
              {/* Browser top */}
              <div className="flex items-center gap-2 border-b border-border/60 pb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

                <div className="ml-3 flex-1 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                  app.docmind.ai
                </div>
              </div>

              {/* App */}
              <div className="mt-4 grid min-h-[430px] grid-cols-[130px_1fr] overflow-hidden rounded-2xl border border-border/50 bg-background">
                {/* Sidebar */}
                <aside className="border-r border-border/50 p-4">
                  <div className="mb-8 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>

                    <span className="text-xs font-bold">DocMind</span>
                  </div>

                  <div className="space-y-2">
                    <PreviewNav active icon={<FileText />} label="Documents" />
                    <PreviewNav icon={<MessageSquare />} label="Chat" />
                    <PreviewNav icon={<Search />} label="Search" />
                  </div>
                </aside>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Workspace</p>

                      <h3 className="mt-1 text-xl font-bold">Your Documents</h3>
                    </div>

                    <button className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-xs font-semibold text-white">
                      Upload
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <PreviewDocument title="Project Report.pdf" />
                    <PreviewDocument title="Research Paper.pdf" />
                    <PreviewDocument title="Product Specs.docx" />
                    <PreviewDocument title="Meeting Notes.pdf" />
                  </div>

                  <div className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-violet-500" />

                      <span className="text-xs font-semibold">AI Assistant</span>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      Ask anything about your documents and get contextual answers instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 scroll-mt-24 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-500">
              Powerful workspace
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to work with documents
            </h2>

            <p className="mt-4 text-muted-foreground">
              One intelligent workspace for your documents, conversations, and knowledge.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-border bg-card/60 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 transition group-hover:bg-violet-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative z-10 scroll-mt-24 mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-500">
              Simple workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From document to answer in seconds.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              DocMind AI turns your documents into an interactive knowledge base so you can spend
              less time searching and more time understanding.
            </p>
          </div>

          <div className="space-y-4">
            <Step
              number="01"
              title="Upload"
              description="Upload your documents to your secure workspace."
            />

            <Step
              number="02"
              title="Understand"
              description="DocMind processes your documents and makes them searchable."
            />

            <Step
              number="03"
              title="Ask"
              description="Ask questions and get contextual AI-powered answers."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="about"
        className="relative z-10 scroll-mt-24 mx-auto max-w-7xl px-6 pb-24 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-background to-blue-600/10 p-10 text-center sm:p-16">
          <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative">
            <ShieldCheck className="mx-auto h-8 w-8 text-violet-500" />

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Ready to make your documents smarter?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create your DocMind workspace and start exploring your documents with AI.
            </p>

            <Link
              href="/register"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3 font-semibold text-white shadow-xl shadow-violet-600/20 transition hover:scale-[1.02]"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row lg:px-8">
          <Logo />

          <p>© 2026 DocMind AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

/* ---------------------------------- */
/* Preview components                 */
/* ---------------------------------- */

function PreviewNav({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[10px] ${
        active ? 'bg-violet-500/10 text-violet-500' : 'text-muted-foreground'
      }`}
    >
      <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>

      {label}
    </div>
  );
}

function PreviewDocument({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
          <FileText className="h-4 w-4 text-red-500" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium">{title}</p>

          <p className="mt-1 text-[9px] text-muted-foreground">PDF · 2.4 MB</p>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-border bg-card/50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-xs font-bold text-violet-500">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
