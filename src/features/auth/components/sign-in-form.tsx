'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react'; // Add these imports
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { da } from 'zod/v4/locales';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Add password visibility state
  const LoginValidation = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
  });

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 2. Define a submit handler.
  async function signInGoogle() {
    try {
      const res = await authClient.signIn.social({
        /**
         * The social provider ID
         * @example "github", "google", "apple"
         */
        provider: 'google',
        /**
         * A URL to redirect after the user authenticates with the provider
         * @default "/"
         */
        callbackURL: '/dashboard',
        /**
         * A URL to redirect if an error occurs during the sign in process
         */
        errorCallbackURL: '/error',
        /**
         * A URL to redirect if the user is newly registered
         */
        newUserCallbackURL: '/'
        /**
         * disable the automatic redirect to the provider.
         * @default false
         */
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    setIsLoading(true);
    const { email, password } = values;

    try {
      const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         *
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: '/dashboard'
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        // rememberMe: false
      });

      if (error) {
        console.error('Authentication failed:', error);
        form.setError('email', {
          type: 'manual',
          message: 'Invalid credentials'
        });
        form.setError('password', {
          type: 'manual',
          message: 'Invalid credentials'
        });
        toast.error('Invalid credentials');
      }
      if (data) {
        toast.success('Login Successful');
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Network error:', error);
      toast.error('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Show forgot password component if user clicks forgot password
  // if (showForgotPassword) {
  //   return (
  //     <div className={cn('flex w-full flex-col gap-6', className)} {...props}>
  //       <ForgotPassword
  //         onBack={() => setShowForgotPassword(false)}
  //         onSuccess={() => {
  //           toast.success('You can now log in with your new password');
  //         }}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className={cn('flex w-full flex-col gap-6', className)} {...props}>
      <Card className='w-full'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-center text-2xl'>Login</CardTitle>
          <CardDescription className='text-center'>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        type='email'
                        autoCapitalize='none'
                        autoComplete='email'
                        autoCorrect='off'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='mb-1 flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link
                        href='/auth/forgot-password'
                        className='text-sm underline'
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='Enter your password'
                          type={showPassword ? 'text' : 'password'}
                          autoComplete='current-password'
                          disabled={isLoading}
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                          onClick={togglePasswordVisibility}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background text-muted-foreground px-2'>
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type='button'
                variant='outline'
                className='w-full'
                onClick={signInGoogle}
                disabled={isLoading}
              >
                <FcGoogle className='mr-2 h-4 w-4' />
                Sign in with Google
              </Button>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <a
                  href='/auth/sign-up'
                  className='underline underline-offset-4'
                >
                  Sign up
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='w-full text-center text-sm'>
        <div className='mt-1 flex w-full flex-wrap items-center justify-center'>
          <span>By joining, you agree to our </span>
          <Link
            href='/terms&conditions'
            target='_blank'
            className='mx-1 flex items-center gap-x-1 font-medium underline-offset-2 hover:underline'
          >
            <span>Terms of Service</span>
          </Link>
          <span>and </span>
          <Link
            href='/privacy-policy'
            target='_blank'
            className='mx-1 flex items-center gap-x-1 font-medium underline-offset-2 hover:underline'
          >
            <span>Privacy and Policy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
