import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/server/db';
import { enrollmentRepository } from '@/server/modules/enrollment/enrollment.repository';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ForbiddenError, NotFoundError } from '@/server/utils/errors';

/**
 * GET /api/v1/programs/[programId]/outline
 * Obtener outline de un programa (requiere enrollment activo)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    const user = await requireAuth();
    const { programId } = await params;

    // Verificar que el usuario tiene acceso activo al programa
    const hasAccess = await enrollmentRepository.hasActiveAccess(user.id, programId);

    if (!hasAccess) {
      throw new ForbiddenError('No tienes acceso a este programa');
    }

    // Obtener el programa con todo su contenido
    const program = await prisma.program.findUnique({
      where: { id: programId },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                slug: true,
                summary: true,
                durationSeconds: true,
                order: true,
                isFreePreview: true,
                isActive: true,
                // youtubeVideoId NO se incluye aquí
                // Se obtiene solo al acceder a una lección específica
              },
            },
          },
        },
      },
    });

    if (!program) {
      throw new NotFoundError('Programa no encontrado');
    }

    return successResponse(program);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
