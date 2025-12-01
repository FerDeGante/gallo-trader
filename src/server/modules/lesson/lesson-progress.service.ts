import { lessonProgressRepository } from './lesson-progress.repository';
import { lessonRepository } from './lesson.repository';
import { enrollmentRepository } from '../enrollment/enrollment.repository';
import { ForbiddenError, NotFoundError } from '@/server/utils/errors';
import { trackEvent } from '@/server/lib/analytics-setup';

export class LessonProgressService {
  /**
   * Actualizar progreso de una lección
   */
  async updateProgress(data: {
    userId: string;
    lessonId: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    lastPositionSeconds?: number;
  }) {
    // Verificar que la lección existe
    const lesson = await lessonRepository.findById(data.lessonId);

    if (!lesson || !lesson.isActive) {
      throw new NotFoundError('Lección no encontrada');
    }

    // Verificar que el usuario tiene acceso al programa
    const hasAccess = await enrollmentRepository.hasActiveAccess(data.userId, lesson.programId);

    if (!hasAccess && !lesson.isFreePreview) {
      throw new ForbiddenError('No tienes acceso a esta lección');
    }

    // Actualizar progreso
    const progress = await lessonProgressRepository.upsertProgress(data);

    // Tracking: Progreso actualizado
    trackEvent({
      event: data.status === 'COMPLETED' ? 'lesson_completed' : 'lesson_progress_updated',
      userId: data.userId,
      lessonId: data.lessonId,
      lessonTitle: lesson.title,
      lessonType: lesson.type,
      programId: lesson.programId,
      moduleId: lesson.moduleId || undefined,
      metadata: {
        status: data.status,
        lastPositionSeconds: data.lastPositionSeconds,
      },
    });

    return progress;
  }

  /**
   * Obtener todo el progreso del usuario
   */
  async getUserProgress(userId: string) {
    return lessonProgressRepository.findByUserId(userId);
  }

  /**
   * Obtener progreso en un programa específico
   */
  async getUserProgramProgress(userId: string, programId: string) {
    // Verificar acceso al programa
    const hasAccess = await enrollmentRepository.hasActiveAccess(userId, programId);

    if (!hasAccess) {
      throw new ForbiddenError('No tienes acceso a este programa');
    }

    const [progress, stats] = await Promise.all([
      lessonProgressRepository.findByUserAndProgram(userId, programId),
      lessonProgressRepository.getProgressStats(userId, programId),
    ]);

    return {
      progress,
      stats,
    };
  }
}

export const lessonProgressService = new LessonProgressService();
