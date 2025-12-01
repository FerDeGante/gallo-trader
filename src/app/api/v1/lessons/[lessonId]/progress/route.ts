import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { lessonProgressService } from '@/server/modules/lesson/lesson-progress.service';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';
import { z } from 'zod';

const updateProgressSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']),
  lastPositionSeconds: z.number().int().min(0).optional(),
});

/**
 * POST /api/v1/lessons/[lessonId]/progress
 * Actualizar progreso de una lección
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const user = await requireAuth();
    const { lessonId } = await params;

    const body = await request.json();
    const validatedData = updateProgressSchema.parse(body);

    const progress = await lessonProgressService.updateProgress({
      userId: user.id,
      lessonId,
      status: validatedData.status,
      lastPositionSeconds: validatedData.lastPositionSeconds,
    });

    return successResponse(progress);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return errorResponse(new ValidationError('Datos inválidos', error));
    }
    return errorResponse(error as Error);
  }
}
