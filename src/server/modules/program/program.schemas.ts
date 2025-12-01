import { z } from 'zod';

// Schema para validar la creación de un programa
export const createProgramSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(255),
  subtitle: z.string().max(500).optional(),
  description: z.string().optional(),
  priceUsd: z.number().int().positive(),
  priceMx: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

// Schema para actualizar un programa
export const updateProgramSchema = createProgramSchema.partial();

// Schema para el slug en params
export const programSlugSchema = z.object({
  slug: z.string().min(1),
});

export type CreateProgramInput = z.infer<typeof createProgramSchema>;
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>;
