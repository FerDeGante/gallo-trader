import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { lessonService } from '@/server/modules/lesson/lesson.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/lessons/[lessonId]
 * Obtener metadata de una lección (sin youtubeVideoId)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const user = await requireAuth();
    const { lessonId } = await params;

    const lesson = await lessonService.getLessonMetadata(user.id, lessonId);

    return successResponse(lesson);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
