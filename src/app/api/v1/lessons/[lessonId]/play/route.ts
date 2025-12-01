import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { lessonService } from '@/server/modules/lesson/lesson.service';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';

/**
 * GET /api/v1/lessons/[lessonId]/play?token=xxx
 * Obtener URL de reproducción validando el token de acceso
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const user = await requireAuth();
    const { lessonId } = await params;
    
    // Obtener token del query string
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      throw new ValidationError('Token requerido');
    }

    const playback = await lessonService.getPlaybackUrl(user.id, lessonId, token);

    return successResponse(playback);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
