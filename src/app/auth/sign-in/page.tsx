import Image from 'next/image';
import {
  Target,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Star
} from 'lucide-react';
import { LoginForm } from '@/features/auth/components/sign-in-form';

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='bg-muted relative hidden lg:block'>
        <div className='absolute inset-0 flex flex-col justify-center p-12'>
          {/* Header */}
          <div className='mb-8'>
            <div className='mb-4 flex items-center gap-3'>
              {/* <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600'>
                <Target className='h-6 w-6 text-white' />
              </div> */}
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Applically
              </h1>
            </div>
            <h2 className='mb-2 text-xl text-gray-700 dark:text-gray-300'>
              Your AI-Powered Interview Success Platform
            </h2>
            <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
              Master your interviews with personalized AI coaching, real-time
              feedback, and comprehensive preparation tools designed for your
              success.
            </p>
          </div>

          {/* Key Features */}
          <div className='space-y-6'>
            <div className='flex items-start gap-4'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
                <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400' />
              </div>
              <div>
                <h3 className='mb-1 font-semibold text-gray-900 dark:text-white'>
                  AI-Powered Mock Interviews
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Practice with intelligent AI that adapts to your industry and
                  provides instant feedback
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
                <TrendingUp className='h-4 w-4 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <h3 className='mb-1 font-semibold text-gray-900 dark:text-white'>
                  Performance Analytics
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Track your progress with detailed analytics and personalized
                  improvement plans
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30'>
                <Users className='h-4 w-4 text-purple-600 dark:text-purple-400' />
              </div>
              <div>
                <h3 className='mb-1 font-semibold text-gray-900 dark:text-white'>
                  Goal-Oriented Preparation
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Set specific career goals and get tailored interview practice
                  for your target roles
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30'>
                <Award className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
              </div>
              <div>
                <h3 className='mb-1 font-semibold text-gray-900 dark:text-white'>
                  Resume Integration
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Upload your resume for personalized questions and feedback
                  based on your experience
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          {/* <div className='mt-8 border-t border-gray-200 pt-8 dark:border-gray-700'>
            <div className='grid grid-cols-2 gap-6'>
              <div className='text-center'>
                <div className='mb-1 text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  10,000+
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  Successful Interviews
                </div>
              </div>
              <div className='text-center'>
                <div className='mb-1 text-2xl font-bold text-green-600 dark:text-green-400'>
                  95%
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  Success Rate
                </div>
              </div>
            </div>
          </div> */}

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
              &quot;Applically transformed my interview skills. The AI feedback
              was incredibly detailed and helped me land my dream job at a top
              tech company.&quot;
            </p>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              - Sarah K., Software Engineer
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-[370px]'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
