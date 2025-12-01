import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { lessonProgressService } from '@/server/modules/lesson/lesson-progress.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/programs/[programId]/progress
 * Obtener progreso del usuario en un programa específico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    const user = await requireAuth();
    const { programId } = await params;

    const data = await lessonProgressService.getUserProgramProgress(user.id, programId);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
