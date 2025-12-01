import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/server/db';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/admin/payments
 * Listar todos los pagos con filtros - Solo admin
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const provider = searchParams.get('provider');
    const programId = searchParams.get('programId');
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status: status as 'PENDING' | 'REQUIRES_ACTION' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CHARGEBACK' }),
      ...(provider && { provider: provider as 'STRIPE' | 'COINBASE_COMMERCE' | 'MANUAL' }),
      ...(programId && { programId }),
      ...(userId && { userId }),
    };

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
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
      prisma.payment.count({ where }),
    ]);

    return successResponse(payments, {
      page,
      limit,
      total,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
