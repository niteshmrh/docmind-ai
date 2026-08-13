'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Check, Eye, EyeOff, FileText, Lock, Mail, Sparkles, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { registerSchema, RegisterForm } from '@/features/auth/schemas/register.schema';

import { useRegister } from '@/features/auth/hooks/useRegister';

import { AppBackground } from '@/components/common/AppTheme';

export default function RegisterContent() {
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AppBackground>
      <div className="flex min-h-screen items-center justify-center px-5 py-12">
        <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="hidden lg:block">
            <div className="max-w-xl space-y-8">
              {/* Brand */}
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

              {/* Hero */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm backdrop-blur">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  Start your AI-powered workspace
                </div>

                <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                  Turn your documents into
                  <br />
                  <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    intelligent knowledge.
                  </span>
                </h2>

                <p className="max-w-lg text-base leading-7 text-muted-foreground">
                  Create your DocMind AI account and start uploading, searching, and chatting with
                  your documents.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <Benefit
                  title="Intelligent document search"
                  description="Find relevant information without manually searching every page."
                />

                <Benefit
                  title="AI-powered conversations"
                  description="Ask questions about your documents and get contextual answers."
                />

                <Benefit
                  title="Secure workspace"
                  description="Keep your documents and conversations organized in one place."
                />
              </div>

              {/* Mini stats */}
              <div className="grid max-w-lg grid-cols-3 gap-3">
                <MiniStat value="AI" label="Powered" />

                <MiniStat value="RAG" label="Search" />

                <MiniStat value="24/7" label="Available" />
              </div>
            </div>
          </div>

          {/* REGISTER CARD */}
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
              <div className="flex justify-center lg:hidden">
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
                <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>

                <p className="text-sm text-muted-foreground">Start using DocMind AI today</p>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="name"
                      placeholder="Nitesh Kumar"
                      autoComplete="name"
                      {...register('name')}
                      className="h-11 pl-10"
                    />
                  </div>

                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register('email')}
                      className="h-11 pl-10"
                    />
                  </div>

                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      {...register('password')}
                      className="h-11 px-10"
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
                        transition
                        hover:text-foreground
                      "
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      {...register('confirmPassword')}
                      className="h-11 px-10"
                    />

                    <button
                      type="button"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowConfirmPassword((previous) => !previous)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-muted-foreground
                        transition
                        hover:text-foreground
                      "
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={registerMutation.isPending}
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
                  {registerMutation.isPending ? 'Creating account...' : 'Create account'}
                </Button>
              </form>

              {/* Login */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="
                    font-semibold
                    text-violet-600
                    transition-colors
                    hover:text-violet-500
                    hover:underline
                    dark:text-violet-400
                  "
                >
                  Sign in
                </Link>
              </p>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                Secure account creation
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppBackground>
  );
}

function Benefit({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
        <Check className="h-4 w-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/50 p-4 text-center backdrop-blur">
      <p className="text-lg font-bold text-violet-500">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
