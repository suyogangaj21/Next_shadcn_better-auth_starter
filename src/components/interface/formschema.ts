import { z } from 'zod';

export const LoginValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const RegisterValidation = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address')
  // password: z.string().min(8, "Password must be at least 8 characters"),
  // confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});
