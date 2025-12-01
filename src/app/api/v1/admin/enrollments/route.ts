import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/server/db';
import { errorResponse, successResponse } from '@/server/utils/response';
import { z } from 'zod';
import { ValidationError } from '@/server/utils/errors';

const createEnrollmentSchema = z.object({
  userId: z.string().uuid(),
  programId: z.string().uuid(),
  source: z.enum(['PAYMENT', 'ADMIN', 'COMP']).default('ADMIN'),
  status: z.enum(['PENDING', 'ACTIVE', 'REVOKED', 'EXPIRED']).default('ACTIVE'),
  notes: z.string().optional(),
  endDate: z.string().datetime().optional(),
});

/**
 * GET /api/v1/admin/enrollments
 * Listar enrollments con filtros - Solo admin
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const programId = searchParams.get('programId');
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status: status as 'PENDING' | 'ACTIVE' | 'REVOKED' | 'EXPIRED' }),
      ...(programId && { programId }),
      ...(userId && { userId }),
    };

    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
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
              slug: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.enrollment.count({ where }),
    ]);

    return successResponse(enrollments, {
      page,
      limit,
      total,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}

/**
 * POST /api/v1/admin/enrollments
 * Crear enrollment manual (becas, cortesías, etc.) - Solo admin
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();

    const body = await request.json();
    const validatedData = createEnrollmentSchema.parse(body);

    // Verificar que no exista ya un enrollment activo
    const existing = await prisma.enrollment.findFirst({
      where: {
        userId: validatedData.userId,
        programId: validatedData.programId,
        status: 'ACTIVE',
      },
    });

    if (existing) {
      throw new ValidationError('El usuario ya tiene un enrollment activo para este programa');
    }

    // Crear enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: validatedData.userId,
        programId: validatedData.programId,
        source: validatedData.source,
        status: validatedData.status,
        notes: validatedData.notes,
        ...(validatedData.endDate && { endDate: new Date(validatedData.endDate) }),
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
        action: 'CREATE_ENROLLMENT',
        targetType: 'Enrollment',
        targetId: enrollment.id,
        metadata: {
          enrollmentId: enrollment.id,
          userId: validatedData.userId,
          programId: validatedData.programId,
          source: validatedData.source,
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
