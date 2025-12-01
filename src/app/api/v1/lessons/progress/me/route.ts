import { requireAuth } from '@/lib/auth';
import { lessonProgressService } from '@/server/modules/lesson/lesson-progress.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/lessons/progress/me
 * Obtener todo el progreso del usuario autenticado
 */
export async function GET() {
  try {
    const user = await requireAuth();

    const progress = await lessonProgressService.getUserProgress(user.id);

    return successResponse(progress);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
