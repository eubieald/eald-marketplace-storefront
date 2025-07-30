import { z } from 'zod';

export const memberLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, { message: 'This field is required' }),
});
