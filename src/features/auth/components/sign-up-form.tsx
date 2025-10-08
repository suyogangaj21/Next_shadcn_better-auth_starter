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
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const SignUpValidation = z
    .object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    });

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function signUpGoogle() {
    try {
      const res = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
        errorCallbackURL: '/error'
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Google sign-up failed. Please try again.');
    }
  }

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    setIsLoading(true);
    const { firstName, lastName, email, password } = values;

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
        callbackURL: '/dashboard'
      });

      if (error) {
        console.error('Registration failed:', error);

        // Handle specific error types
        if (error.message?.includes('email')) {
          form.setError('email', {
            type: 'manual',
            message: 'This email is already registered'
          });
          toast.error('This email is already registered');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      }

      if (data) {
        toast.success(
          'Account created successfully! Please check your email to verify your account.'
        );
        router.push('/auth/sign-in');
      }
    } catch (error: any) {
      console.error('Network error:', error);
      toast.error('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('flex w-full flex-col gap-6', className)} {...props}>
      <Card className='w-full'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-center text-2xl'>Create Account</CardTitle>
          <CardDescription className='text-center'>
            Please fill in your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                          <Input
                            placeholder='John'
                            className='pl-10'
                            autoComplete='given-name'
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                          <Input
                            placeholder='Doe'
                            className='pl-10'
                            autoComplete='family-name'
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                        <Input
                          placeholder='suyogangaj21@gmail.com'
                          type='email'
                          className='pl-10'
                          autoCapitalize='none'
                          autoComplete='email'
                          autoCorrect='off'
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                        <Input
                          placeholder='Suyog@2132'
                          type={showPassword ? 'text' : 'password'}
                          className='pr-10 pl-10'
                          autoComplete='new-password'
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

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                        <Input
                          placeholder='••••••••'
                          type={showConfirmPassword ? 'text' : 'password'}
                          className='pr-10 pl-10'
                          autoComplete='new-password'
                          disabled={isLoading}
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                          onClick={toggleConfirmPasswordVisibility}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? (
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
                {isLoading ? 'Creating Account...' : 'Continue'}
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
                onClick={signUpGoogle}
                disabled={isLoading}
              >
                <FcGoogle className='mr-2 h-4 w-4' />
                Sign up with Google
              </Button>

              <div className='mt-4 text-center text-sm'>
                Already have an account?{' '}
                <Link
                  href='/auth/sign-in'
                  className='underline underline-offset-4'
                >
                  Sign in
                </Link>
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
            <span>Privacy Policy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
