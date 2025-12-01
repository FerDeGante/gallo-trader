import { prisma } from '@/server/db';
import crypto from 'crypto';

export class LessonAccessTokenRepository {
  /**
   * Crear un token de acceso a una lección
   */
  async create(userId: string, lessonId: string, expiresInMinutes = 15) {
    const token = crypto.randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    return prisma.lessonAccessToken.create({
      data: {
        userId,
        lessonId,
        token,
        expiresAt,
      },
    });
  }

  /**
   * Validar y obtener un token
   */
  async validateToken(token: string, userId: string, lessonId: string) {
    const accessToken = await prisma.lessonAccessToken.findFirst({
      where: {
        token,
        userId,
        lessonId,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        lesson: true,
      },
    });

    return accessToken;
  }

  /**
   * Marcar token como usado
   */
  async markAsUsed(tokenId: string) {
    return prisma.lessonAccessToken.update({
      where: { id: tokenId },
      data: { usedAt: new Date() },
    });
  }

  /**
   * Limpiar tokens expirados (ejecutar periódicamente)
   */
  async cleanExpired() {
    return prisma.lessonAccessToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}

export const lessonAccessTokenRepository = new LessonAccessTokenRepository();
