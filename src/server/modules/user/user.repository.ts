import { prisma } from '@/server/db';

export class UserRepository {
  /**
   * Obtener usuario con enrollments y payments
   */
  async findUserWithDetails(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        enrollments: {
          where: {
            status: {
              in: ['ACTIVE', 'PENDING'],
            },
          },
          include: {
            program: {
              select: {
                id: true,
                slug: true,
                title: true,
                subtitle: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10, // Últimos 10 pagos
          include: {
            program: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });
  }
}

export const userRepository = new UserRepository();
