import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { userService } from '@/server/modules/user/user.service';
import { errorResponse, successResponse } from '@/server/utils/response';
import { UnauthorizedError } from '@/server/utils/errors';

/**
 * GET /api/v1/me
 * Obtener información del usuario autenticado con enrollments y payments
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!user) {
      throw new UnauthorizedError('Debes iniciar sesión');
    }

    const userDetails = await userService.getUserDetails(user.id);

    return successResponse(userDetails);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
