import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/server/db';
import { errorResponse, successResponse } from '@/server/utils/response';
import { NotFoundError, ValidationError } from '@/server/utils/errors';
import { z } from 'zod';

const updateEnrollmentSchema = z.object({
  status: z.enum(['PENDING', 'ACTIVE', 'REVOKED', 'EXPIRED']),
  notes: z.string().optional(),
  endDate: z.string().datetime().optional().nullable(),
});

/**
 * PATCH /api/v1/admin/enrollments/[enrollmentId]
 * Actualizar estado de un enrollment - Solo admin
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ enrollmentId: string }> }
) {
  try {
    const admin = await requireAdmin();
    const { enrollmentId } = await params;

    const body = await request.json();
    const validatedData = updateEnrollmentSchema.parse(body);

    // Verificar que el enrollment existe
    const existing = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        user: { select: { id: true, email: true } },
        program: { select: { id: true, title: true } },
      },
    });

    if (!existing) {
      throw new NotFoundError('Enrollment no encontrado');
    }

    // Actualizar enrollment
    const enrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: validatedData.status,
        notes: validatedData.notes,
        ...(validatedData.endDate !== undefined && {
          endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        program: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Registrar en audit log
    await prisma.adminAuditLog.create({
      data: {
        userId: admin.id,
        action: 'UPDATE_ENROLLMENT',
        targetType: 'Enrollment',
        targetId: enrollmentId,
        metadata: {
          enrollmentId,
          previousStatus: existing.status,
          newStatus: validatedData.status,
          userId: existing.userId,
          programId: existing.programId,
        },
      },
    });

    return successResponse(enrollment);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return errorResponse(new ValidationError('Datos inválidos', error));
    }
    return errorResponse(error as Error);
  }
}
