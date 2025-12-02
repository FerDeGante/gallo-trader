import { lessonRepository } from './lesson.repository';
import { lessonAccessTokenRepository } from './lesson-access-token.repository';
import { enrollmentRepository } from '../enrollment/enrollment.repository';
import { NotFoundError, ForbiddenError, UnauthorizedError } from '@/server/utils/errors';
import { trackEvent } from '@/server/lib/analytics-setup';

export class LessonService {
  /**
   * Obtener metadata de una lección (sin videoId)
   */
  async getLessonMetadata(userId: string, lessonId: string) {
    const lesson = await lessonRepository.findById(lessonId);

    if (!lesson || !lesson.isActive) {
      throw new NotFoundError('Lección no encontrada');
    }

    // Verificar acceso al programa
    const hasAccess = await enrollmentRepository.hasActiveAccess(userId, lesson.programId);

    if (!hasAccess && !lesson.isFreePreview) {
      throw new ForbiddenError('No tienes acceso a esta lección');
    }

    return {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      summary: lesson.summary,
      durationSeconds: lesson.durationSeconds,
      isFreePreview: lesson.isFreePreview,
      programId: lesson.programId,
      moduleId: lesson.moduleId,
    };
  }

  /**
   * Generar token de acceso para reproducir una lección
   */
  async generateAccessToken(userId: string, lessonId: string) {
    const lesson = await lessonRepository.findById(lessonId);

    if (!lesson || !lesson.isActive) {
      throw new NotFoundError('Lección no encontrada');
    }

    // Verificar acceso (enrollment activo o preview gratuita)
    const hasAccess = await enrollmentRepository.hasActiveAccess(userId, lesson.programId);
    const isFreePreview = lesson.isFreePreview;

    if (!hasAccess && !isFreePreview) {
      throw new ForbiddenError('No tienes acceso a esta lección');
    }

    // Crear token de acceso (expira en 15 minutos)
    const accessToken = await lessonAccessTokenRepository.create(userId, lessonId, 15);

    return {
      token: accessToken.token,
      expiresAt: accessToken.expiresAt,
      lessonId: lesson.id,
    };
  }

  /**
   * Obtener URL de reproducción validando el token
   */
  async getPlaybackUrl(userId: string, lessonId: string, token: string) {
    // Validar token
    const accessToken = await lessonAccessTokenRepository.validateToken(token, userId, lessonId);

    if (!accessToken) {
      throw new UnauthorizedError('Token inválido, expirado o ya usado');
    }

    const lesson = accessToken.lesson;

    if (!lesson.youtubeVideoId) {
      throw new NotFoundError('Esta lección no tiene video configurado');
    }

    // Marcar token como usado (opcional - permite un solo uso)
    // await lessonAccessTokenRepository.markAsUsed(accessToken.id);

    // Tracking: Lección accedida/iniciada
    trackEvent({
      event: 'lesson_accessed',
      userId,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonDuration: lesson.durationSeconds || undefined,
      programId: lesson.programId,
      moduleId: lesson.moduleId || undefined,
    });

    // Construir URL de embed de YouTube
    const embedUrl = `https://www.youtube.com/embed/${lesson.youtubeVideoId}`;

    return {
      embedUrl,
      lessonId: lesson.id,
      title: lesson.title,
    };
  }
}

export const lessonService = new LessonService();
