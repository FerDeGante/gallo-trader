import { z } from 'zod';

export const createCryptoCheckoutSchema = z.object({
  programId: z.string().uuid(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export type CreateCryptoCheckoutInput = z.infer<typeof createCryptoCheckoutSchema>;
