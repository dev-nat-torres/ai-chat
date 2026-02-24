import { createAuthClient } from 'better-auth/react';
import { z } from 'zod';

export const { signUp, signIn, signOut, useSession } = createAuthClient({});

export const signInSchema = z.object({
  email: z.email('Invalid email address.'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long.')
    .max(75, 'Password is too long.'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
