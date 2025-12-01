import { requireAuth } from '@/lib/auth';
import { prisma } from '@/server/db';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/aula/outline
 * Obtener programas en los que el usuario tiene enrollment activo
 */
export async function GET() {
  try {
    const user = await requireAuth();
    
    // Obtener enrollments activos del usuario con programas y contenido
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: user.id,
        status: 'ACTIVE',
      },
      include: {
        program: {
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
                    // NO incluir youtubeVideoId aquí - se obtiene al acceder a la lección
                  },
                },
              },
            },
          },
        },
      },
    });

    // Transformar para devolver solo los programas con su contenido
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const programs = enrollments.map((enrollment: any) => ({
      enrollmentId: enrollment.id,
      enrolledAt: enrollment.startDate,
      program: enrollment.program,
    }));

    return successResponse(programs);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
