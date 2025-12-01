import { prisma } from '@/server/db';

export class LessonProgressRepository {
  /**
   * Crear o actualizar progreso de una lección (upsert)
   */
  async upsertProgress(data: {
    userId: string;
    lessonId: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    lastPositionSeconds?: number;
  }) {
    const now = new Date();
    
    return prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: data.userId,
          lessonId: data.lessonId,
        },
      },
      update: {
        status: data.status,
        lastPositionSeconds: data.lastPositionSeconds,
        ...(data.status === 'COMPLETED' && { completedAt: now }),
      },
      create: {
        userId: data.userId,
        lessonId: data.lessonId,
        status: data.status,
        lastPositionSeconds: data.lastPositionSeconds,
        firstStartedAt: now,
        ...(data.status === 'COMPLETED' && { completedAt: now }),
      },
    });
  }

  /**
   * Obtener todo el progreso de un usuario
   */
  async findByUserId(userId: string) {
    return prisma.lessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
            programId: true,
            moduleId: true,
            durationSeconds: true,
          },
        },
      },
      orderBy: { firstStartedAt: 'desc' },
    });
  }

  /**
   * Obtener progreso de un usuario en un programa específico
   */
  async findByUserAndProgram(userId: string, programId: string) {
    return prisma.lessonProgress.findMany({
      where: {
        userId,
        lesson: {
          programId,
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
            moduleId: true,
            order: true,
            durationSeconds: true,
          },
        },
      },
      orderBy: {
        lesson: {
          order: 'asc',
        },
      },
    });
  }

  /**
   * Obtener estadísticas de progreso de un usuario en un programa
   */
  async getProgressStats(userId: string, programId: string) {
    const [total, completed, inProgress] = await Promise.all([
      prisma.lesson.count({
        where: {
          programId,
          isActive: true,
        },
      }),
      prisma.lessonProgress.count({
        where: {
          userId,
          status: 'COMPLETED',
          lesson: {
            programId,
            isActive: true,
          },
        },
      }),
      prisma.lessonProgress.count({
        where: {
          userId,
          status: 'IN_PROGRESS',
          lesson: {
            programId,
            isActive: true,
          },
        },
      }),
    ]);

    return {
      total,
      completed,
      inProgress,
      notStarted: total - completed - inProgress,
      completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }
}

export const lessonProgressRepository = new LessonProgressRepository();
