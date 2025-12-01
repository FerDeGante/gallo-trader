import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/server/db';
import { errorResponse, successResponse } from '@/server/utils/response';
import { NotFoundError } from '@/server/utils/errors';

/**
 * GET /api/v1/admin/programs/[programId]/dashboard
 * Obtener métricas y dashboard de un programa - Solo admin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    await requireAdmin();
    const { programId } = await params;

    // Verificar que el programa existe
    const program = await prisma.program.findUnique({
      where: { id: programId },
      select: {
        id: true,
        title: true,
        slug: true,
        priceUsd: true,
        priceMx: true,
        isActive: true,
      },
    });

    if (!program) {
      throw new NotFoundError('Programa no encontrado');
    }

    // Obtener métricas
    const [
      totalEnrollments,
      activeEnrollments,
      totalPayments,
      successfulPayments,
      totalRevenue,
      recentEnrollments,
      recentPayments,
    ] = await Promise.all([
      // Total enrollments
      prisma.enrollment.count({
        where: { programId },
      }),
      
      // Enrollments activos
      prisma.enrollment.count({
        where: {
          programId,
          status: 'ACTIVE',
        },
      }),
      
      // Total pagos
      prisma.payment.count({
        where: { programId },
      }),
      
      // Pagos exitosos
      prisma.payment.count({
        where: {
          programId,
          status: 'SUCCEEDED',
        },
      }),
      
      // Ingresos totales (solo pagos exitosos)
      prisma.payment.aggregate({
        where: {
          programId,
          status: 'SUCCEEDED',
        },
        _sum: {
          amount: true,
        },
      }),
      
      // Últimos 10 enrollments
      prisma.enrollment.findMany({
        where: { programId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      
      // Últimos 10 pagos
      prisma.payment.findMany({
        where: { programId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ]);

    const dashboard = {
      program,
      metrics: {
        enrollments: {
          total: totalEnrollments,
          active: activeEnrollments,
          inactive: totalEnrollments - activeEnrollments,
        },
        payments: {
          total: totalPayments,
          successful: successfulPayments,
          failed: totalPayments - successfulPayments,
        },
        revenue: {
          totalCents: totalRevenue._sum.amount || 0,
          totalUsd: ((totalRevenue._sum.amount || 0) / 100).toFixed(2),
        },
      },
      recent: {
        enrollments: recentEnrollments,
        payments: recentPayments,
      },
    };

    return successResponse(dashboard);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
