'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, FileText, Sparkles, Folder, MessageSquare, BrainCircuit } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { loginSchema, LoginForm } from '@/features/auth/schemas/login.schema';
import { useLogin } from '@/features/auth/hooks/useLogin';

import { AppBackground } from '@/components/common/AppTheme';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isAuthenticated, isInitialized } = useAuth();

  const redirect = searchParams.get('redirect');
  const login = useLogin(redirect);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    login.mutate(data);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return (
      <AppBackground>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Checking authentication...
          </div>
        </div>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <div className="relative min-h-screen">
        {/* Theme Toggle */}
        <div className="absolute right-5 top-3 z-50 sm:right-6 sm:top-6">
          <ThemeToggle />
        </div>
        <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-8 lg:grid-cols-2 lg:px-10">
          {/* LEFT SIDE */}
          <div className="hidden space-y-8 lg:block">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-violet-600
                  to-blue-600
                  text-white
                  shadow-lg
                  shadow-violet-500/20
                "
              >
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">DocMind AI</h1>
                <p className="text-sm text-muted-foreground">Intelligent document workspace</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-violet-500" />
                AI-powered document intelligence
              </div>

              <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Your documents.
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Smarter with AI.
                </span>
              </h2>

              <p className="max-w-lg text-base leading-7 text-muted-foreground">
                Upload documents, search your knowledge, and have intelligent conversations with
                your files using DocMind AI.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <Feature
                icon={Folder}
                title="Documents"
                description="Organize your files"
                iconClassName="
                    border-blue-500/30
                    bg-blue-500/10
                    text-blue-500
                    group-hover:border-blue-500/60
                    group-hover:bg-blue-500/15
                    group-hover:shadow-lg
                    group-hover:shadow-blue-500/20
                  "
              />
              <Feature
                icon={MessageSquare}
                title="AI Chat"
                description="Ask your documents"
                iconClassName="
                    border-violet-500/30
                    bg-violet-500/10
                    text-violet-500
                    group-hover:border-violet-500/60
                    group-hover:bg-violet-500/15
                    group-hover:shadow-lg
                    group-hover:shadow-violet-500/20
                  "
              />
              <Feature
                icon={BrainCircuit}
                title="RAG"
                description="Context-aware answers"
                iconClassName="
                    border-fuchsia-500/30
                    bg-fuchsia-500/10
                    text-fuchsia-500
                    group-hover:border-fuchsia-500/60
                    group-hover:bg-fuchsia-500/15
                    group-hover:shadow-lg
                    group-hover:shadow-fuchsia-500/20
                  "
              />
            </div>
          </div>

          {/* LOGIN CARD */}
          <Card
            className="
              mx-auto
              w-full
              max-w-md
              border-border/60
              bg-card/80
              shadow-2xl
              shadow-violet-500/5
              backdrop-blur-xl
            "
          >
            <CardHeader className="space-y-5 pb-6">
              {/* Mobile logo */}
              <div className="flex items-center justify-center lg:hidden">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-600
                    to-blue-600
                    text-white
                    shadow-lg
                  "
                >
                  <FileText className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>

                <p className="text-sm text-muted-foreground">Sign in to continue to DocMind AI</p>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register('email')}
                    className="h-11"
                  />

                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...register('password')}
                      className="h-11 pr-11"
                    />

                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-muted-foreground
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Login button */}
                <Button
                  type="submit"
                  disabled={login.isPending}
                  className="
                    h-11
                    w-full
                    bg-gradient-to-r
                    from-violet-600
                    to-blue-600
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-violet-500/20
                    transition-all
                    hover:from-violet-700
                    hover:to-blue-700
                    hover:shadow-violet-500/30
                  "
                >
                  {login.isPending ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              {/* Register */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="
                    font-semibold
                    text-violet-600
                    transition-colors
                    hover:text-violet-500
                    hover:underline
                    dark:text-violet-400
                  "
                >
                  Create an account
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Secure AI-powered workspace
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppBackground>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
  iconClassName,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconClassName: string;
}) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-border/70
        bg-card/20
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/40
        hover:bg-primary/[0.04]
        hover:shadow-lg
        hover:shadow-primary/10
      "
    >
      {/* Icon */}
      <div
        className={`
          mb-4
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          bg-background/80
          transition-all
          duration-300
          group-hover:scale-110
          ${iconClassName}
        `}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Text */}
      <h3 className="text-sm font-semibold">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
    </div>
  );
}
