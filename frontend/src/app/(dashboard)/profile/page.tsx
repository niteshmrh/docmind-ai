'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Mail, ShieldCheck, UserCircle, UserRound } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuth } from '@/context/AuthContext';
import { useMe } from '@/features/auth/hooks/useMe';
import { useUpdateProfile } from '@/features/auth/hooks/useUpdateProfile';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),

  email: z.string().email('Please enter a valid email'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuth();

  const { data: currentUser, isLoading: userLoading } = useMe();

  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    const profileUser = currentUser ?? user;

    if (profileUser) {
      reset({
        name: profileUser.name,
        email: profileUser.email,
      });
    }
  }, [currentUser, user, reset]);

  function onSubmit(data: ProfileForm) {
    updateProfile.mutate(data);
  }

  const profile = currentUser ?? user;

  if (userLoading && !profile) {
    return (
      <main className="docmind-page docmind-gradient min-h-full">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
      </main>
    );
  }

  const initials =
    profile?.name
      ?.split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  return (
    <main
      className="
        docmind-page
        docmind-gradient
        min-h-full
        px-5
        py-8
        md:px-8
        lg:px-10
      "
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">Account</p>

          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">Profile</h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Manage your personal information and account details.
          </p>
        </div>

        {/* =====================================================
            PROFILE HERO
        ===================================================== */}
        <Card className="docmind-card mb-6 overflow-hidden">
          <div className="docmind-gradient border-b border-border px-6 py-7 md:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary
                  text-2xl
                  font-semibold
                  text-primary-foreground
                  shadow-lg
                  shadow-primary/20
                  ring-4
                  ring-primary/10
                "
              >
                {initials}
              </div>

              {/* User */}
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-primary">
                  DocMind AI Account
                </p>

                <h2 className="mt-1 truncate font-heading text-2xl font-semibold">
                  {profile?.name ?? 'User'}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{profile?.email ?? 'No email available'}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* ===================================================
              PERSONAL INFORMATION
          =================================================== */}
          <Card className="docmind-card overflow-hidden">
            <CardHeader className="border-b border-border bg-card/60">
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle className="font-heading text-xl">Personal Information</CardTitle>

                  <CardDescription className="mt-1">
                    Update your name and email address.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>

                  <Input
                    id="name"
                    placeholder="Your name"
                    className="h-11 rounded-xl"
                    {...register('name')}
                  />

                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 rounded-xl"
                    {...register('email')}
                  />

                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Save */}
                <div className="flex justify-end border-t border-border pt-5">
                  <Button
                    type="submit"
                    className="rounded-xl px-5"
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* ===================================================
              ACCOUNT INFORMATION
          =================================================== */}
          <div className="space-y-6">
            <Card className="docmind-card">
              <CardHeader>
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <UserCircle className="h-5 w-5" />
                </div>

                <CardTitle className="mt-4 font-heading text-lg">Account</CardTitle>

                <CardDescription>Your DocMind AI account information.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Role */}
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>

                  <div className="mt-2 inline-flex items-center rounded-lg border border-border bg-muted/40 px-3 py-1.5">
                    <span className="text-sm font-medium">{profile?.role ?? 'USER'}</span>
                  </div>
                </div>

                {/* Verification */}
                <div>
                  <p className="text-xs text-muted-foreground">Email verification</p>

                  <div className="mt-2 flex items-center gap-2">
                    {profile?.isVerified ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                        <span className="text-sm font-medium text-emerald-500">Verified</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />

                        <span className="text-sm font-medium text-muted-foreground">
                          Not verified
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Member since */}
                {profile?.createdAt && (
                  <div>
                    <p className="text-xs text-muted-foreground">Member since</p>

                    <p className="mt-2 text-sm font-medium">
                      {new Date(profile.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account status */}
            <Card className="docmind-card">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Account active</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Your DocMind AI account is ready to use.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
