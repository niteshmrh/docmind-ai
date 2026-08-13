'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useChangePassword } from '@/features/auth/hooks/useChangePassword';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const changePassword = useChangePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: PasswordForm) {
    changePassword.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

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

          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">Settings</h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Manage your account security and preferences.
          </p>
        </div>

        {/* =====================================================
            SETTINGS CONTENT
        ===================================================== */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* ===================================================
              CHANGE PASSWORD
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
                  <KeyRound className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle className="font-heading text-xl">Change Password</CardTitle>

                  <CardDescription className="mt-1">
                    Update your password to keep your account secure.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Current password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>

                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Enter your current password"
                      className="h-11 rounded-xl pr-11"
                      {...register('currentPassword')}
                    />

                    <button
                      type="button"
                      aria-label={
                        showCurrentPassword ? 'Hide current password' : 'Show current password'
                      }
                      onClick={() => setShowCurrentPassword((value) => !value)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-8
                        w-8
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                      "
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.currentPassword && (
                    <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
                  )}
                </div>

                {/* New password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>

                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter your new password"
                      className="h-11 rounded-xl pr-11"
                      {...register('newPassword')}
                    />

                    <button
                      type="button"
                      aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                      onClick={() => setShowNewPassword((value) => !value)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-8
                        w-8
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                      "
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.newPassword && (
                    <p className="text-xs text-destructive">{errors.newPassword.message}</p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Use at least 8 characters for your new password.
                  </p>
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>

                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      className="h-11 rounded-xl pr-11"
                      {...register('confirmPassword')}
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? 'Hide confirmation password'
                          : 'Show confirmation password'
                      }
                      onClick={() => setShowConfirmPassword((value) => !value)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-8
                        w-8
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-muted-foreground
                        hover:bg-muted
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
                    <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex justify-end border-t border-border pt-5">
                  <Button
                    type="submit"
                    className="rounded-xl px-5"
                    disabled={changePassword.isPending}
                  >
                    {changePassword.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <KeyRound className="mr-2 h-4 w-4" />
                        Change Password
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* ===================================================
              SECURITY INFORMATION
          =================================================== */}
          <div className="space-y-6">
            <Card className="docmind-card">
              <CardHeader>
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-500/10
                    text-emerald-500
                  "
                >
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <CardTitle className="mt-4 font-heading text-lg">Account Security</CardTitle>

                <CardDescription className="leading-5">
                  Keep your DocMind AI account protected with a strong password.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-sm font-medium">Password protection</p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your password is securely handled by the authentication system.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="docmind-card">
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-primary">
                  Security tip
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Never reuse your DocMind AI password on other websites or services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
// <main className="docmind-page docmind-gradient min-h-full">
//   {/* Header */}
//   <div>
//     <h1 className="text-3xl font-bold">Settings</h1>

//     <p className="mt-1 text-sm text-muted-foreground">Manage your account settings.</p>
//   </div>

//   <div className="max-w-2xl">
//     <Card>
//       <CardHeader>
//         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//           <KeyRound className="h-5 w-5 text-primary" />
//         </div>

//         <CardTitle>Change Password</CardTitle>

//         <CardDescription>Update your password to keep your account secure.</CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Current password */}
//           <div className="space-y-2">
//             <Label htmlFor="currentPassword">Current Password</Label>

//             <div className="relative">
//               <Input
//                 id="currentPassword"
//                 type={showCurrentPassword ? 'text' : 'password'}
//                 placeholder="Enter your current password"
//                 className="pr-10"
//                 {...register('currentPassword')}
//               />

//               <button
//                 type="button"
//                 aria-label={
//                   showCurrentPassword ? 'Hide current password' : 'Show current password'
//                 }
//                 onClick={() => setShowCurrentPassword((value) => !value)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//               >
//                 {showCurrentPassword ? (
//                   <EyeOff className="h-4 w-4" />
//                 ) : (
//                   <Eye className="h-4 w-4" />
//                 )}
//               </button>
//             </div>

//             {errors.currentPassword && (
//               <p className="text-sm text-destructive">{errors.currentPassword.message}</p>
//             )}
//           </div>

//           {/* New password */}
//           <div className="space-y-2">
//             <Label htmlFor="newPassword">New Password</Label>

//             <div className="relative">
//               <Input
//                 id="newPassword"
//                 type={showNewPassword ? 'text' : 'password'}
//                 placeholder="Enter your new password"
//                 className="pr-10"
//                 {...register('newPassword')}
//               />

//               <button
//                 type="button"
//                 aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
//                 onClick={() => setShowNewPassword((value) => !value)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//               >
//                 {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>

//             {errors.newPassword && (
//               <p className="text-sm text-destructive">{errors.newPassword.message}</p>
//             )}
//           </div>

//           {/* Confirm password */}
//           <div className="space-y-2">
//             <Label htmlFor="confirmPassword">Confirm New Password</Label>

//             <div className="relative">
//               <Input
//                 id="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 placeholder="Confirm your new password"
//                 className="pr-10"
//                 {...register('confirmPassword')}
//               />

//               <button
//                 type="button"
//                 aria-label={
//                   showConfirmPassword
//                     ? 'Hide confirmation password'
//                     : 'Show confirmation password'
//                 }
//                 onClick={() => setShowConfirmPassword((value) => !value)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="h-4 w-4" />
//                 ) : (
//                   <Eye className="h-4 w-4" />
//                 )}
//               </button>
//             </div>

//             {errors.confirmPassword && (
//               <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
//             )}
//           </div>

//           {/* Submit */}
//           <Button type="submit" disabled={changePassword.isPending}>
//             {changePassword.isPending ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Changing Password...
//               </>
//             ) : (
//               'Change Password'
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   </div>
// </main>
