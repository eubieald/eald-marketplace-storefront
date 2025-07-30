import { z } from 'zod';

export const memberRegisterFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(3),
  username: z
    .string()
    .min(3)
    .max(63, 'Username must be less than 64 characters')
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      'Username must start and end with a letter or number, and can only contain letters, numbers, and hyphens'
    )
    .refine(
      (val) => !val.includes('--'),
      'Username cannot contain consecutive hyphens'
    )
    .transform((val) => val.toLowerCase()),
});
