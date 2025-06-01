import { z } from 'zod';

export const quickSearchSchema = z.object({
  freeWordSearch: z.string().optional(),
});
