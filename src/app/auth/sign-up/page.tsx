import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='bg-muted relative hidden lg:block'>
        <div className='absolute inset-0 flex flex-col justify-center p-12'>
          {/* Header */}
          <div className='mb-8'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-lg'>
                <span className='text-primary-foreground text-lg font-bold'>
                  A
                </span>
              </div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Applically
              </h1>
            </div>
            <h2 className='mb-2 text-xl text-gray-700 dark:text-gray-300'>
              Join thousands of successful candidates
            </h2>
            <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
              Start your journey to interview success with personalized AI
              coaching and comprehensive preparation tools.
            </p>
          </div>

          {/* Key Features */}
          <div className='space-y-6'>
            <div className='flex items-start gap-4'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
                <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400' />
              </div>
              <div>
                <h3 className='font-medium text-gray-900 dark:text-white'>
                  AI-Powered Coaching
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Get personalized feedback and coaching tailored to your
                  industry
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
                <TrendingUp className='h-4 w-4 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <h3 className='font-medium text-gray-900 dark:text-white'>
                  Track Your Progress
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Monitor your improvement with detailed analytics and insights
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className='mt-8 rounded-lg bg-white/50 p-4 backdrop-blur-sm dark:bg-gray-800/50'>
            <div className='mb-2 flex items-center gap-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className='h-4 w-4 fill-yellow-400 text-yellow-400'
                />
              ))}
            </div>
            <p className='mb-2 text-sm text-gray-700 italic dark:text-gray-300'>
              &quot;Applically helped me prepare for my interviews
              systematically. The AI feedback was spot-on and helped me improve
              my responses.&quot;
            </p>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              - Michael R., Product Manager
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-[370px]'>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
