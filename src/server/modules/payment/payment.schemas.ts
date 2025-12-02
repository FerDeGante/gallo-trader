import { z } from 'zod';

export const createCheckoutSchema = z.object({
  programId: z.string().min(1),
  customerEmail: z.string().email().optional(),
  successUrl: z.string().optional(),
  cancelUrl: z.string().optional(),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
