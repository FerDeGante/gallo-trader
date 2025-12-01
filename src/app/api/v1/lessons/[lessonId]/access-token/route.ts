import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { lessonService } from '@/server/modules/lesson/lesson.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * POST /api/v1/lessons/[lessonId]/access-token
 * Generar token de acceso temporal para reproducir una lección
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const user = await requireAuth();
    const { lessonId } = await params;

    const accessToken = await lessonService.generateAccessToken(user.id, lessonId);

    return successResponse(accessToken);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
