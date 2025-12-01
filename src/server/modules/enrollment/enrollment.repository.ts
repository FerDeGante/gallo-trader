import { prisma } from '@/server/db';

export class EnrollmentRepository {
  /**
   * Crear un enrollment
   */
  async create(data: {
    userId: string;
    programId: string;
    status?: 'PENDING' | 'ACTIVE' | 'REVOKED' | 'EXPIRED';
    source?: 'PAYMENT' | 'ADMIN' | 'COMP';
    paymentId?: string;
    endDate?: Date;
    notes?: string;
  }) {
    return prisma.enrollment.create({
      data: {
        ...data,
        status: data.status || 'ACTIVE',
        source: data.source || 'PAYMENT',
      },
    });
  }

  /**
   * Buscar enrollment activo de un usuario para un programa
   */
  async findActiveByUserAndProgram(userId: string, programId: string) {
    return prisma.enrollment.findFirst({
      where: {
        userId,
        programId,
        status: 'ACTIVE',
      },
    });
  }

  /**
   * Verificar si un usuario tiene acceso activo a un programa
   */
  async hasActiveAccess(userId: string, programId: string): Promise<boolean> {
    const enrollment = await this.findActiveByUserAndProgram(userId, programId);
    return !!enrollment;
  }

  /**
   * Actualizar estado de un enrollment
   */
  async updateStatus(
    enrollmentId: string,
    status: 'PENDING' | 'ACTIVE' | 'REVOKED' | 'EXPIRED',
    notes?: string
  ) {
    return prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status,
        ...(notes && { notes }),
      },
    });
  }
}

export const enrollmentRepository = new EnrollmentRepository();
