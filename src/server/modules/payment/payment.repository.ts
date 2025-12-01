import { prisma } from '@/server/db';

export class PaymentRepository {
  /**
   * Crear un nuevo pago
   */
  async create(data: {
    userId: string;
    programId: string;
    amount: number;
    currency: 'USD' | 'MXN';
    provider: 'STRIPE' | 'COINBASE_COMMERCE' | 'MANUAL';
    providerPaymentId: string;
    status?: 'PENDING' | 'REQUIRES_ACTION' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CHARGEBACK';
  }) {
    return prisma.payment.create({
      data: {
        ...data,
        status: data.status || 'PENDING',
      },
    });
  }

  /**
   * Buscar pago por ID del proveedor
   */
  async findByProviderPaymentId(
    provider: 'STRIPE' | 'COINBASE_COMMERCE' | 'MANUAL',
    providerPaymentId: string
  ) {
    return prisma.payment.findFirst({
      where: {
        provider,
        providerPaymentId,
      },
      include: {
        user: true,
        program: true,
      },
    });
  }

  /**
   * Actualizar estado de un pago
   */
  async updateStatus(
    paymentId: string,
    status: 'PENDING' | 'REQUIRES_ACTION' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CHARGEBACK',
    rawProviderPayload?: object
  ) {
    return prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        ...(rawProviderPayload && { rawProviderPayload }),
      },
    });
  }

  /**
   * Obtener pagos de un usuario
   */
  async findByUserId(userId: string, limit = 10) {
    return prisma.payment.findMany({
      where: { userId },
      include: {
        program: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

export const paymentRepository = new PaymentRepository();
