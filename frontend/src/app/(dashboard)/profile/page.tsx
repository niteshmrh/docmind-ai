'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UserCircle } from 'lucide-react';
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
      <main className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );
  }

  return (
    <main className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>

        <p className="mt-1 text-sm text-muted-foreground">Manage your personal information.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Profile form */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>

            <CardDescription>Update your name and email address.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input id="name" placeholder="Your name" {...register('name')} />

                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                />

                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account information */}
        <Card>
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>

            <CardTitle>Account</CardTitle>

            <CardDescription>Your account information.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Role</p>

              <p className="mt-1 font-medium">{profile?.role ?? 'USER'}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Email verification</p>

              <p className="mt-1 font-medium">
                {profile?.isVerified ? 'Verified' : 'Not verified'}
              </p>
            </div>

            {profile?.createdAt && (
              <div>
                <p className="text-xs text-muted-foreground">Member since</p>

                <p className="mt-1 font-medium">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
