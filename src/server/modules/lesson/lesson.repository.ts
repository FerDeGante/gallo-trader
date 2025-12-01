import { prisma } from '@/server/db';

export class LessonRepository {
  /**
   * Obtener lección por ID
   */
  async findById(lessonId: string) {
    return prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        program: true,
        module: true,
      },
    });
  }

  /**
   * Obtener lección con youtubeVideoId (solo si tiene acceso)
   */
  async findByIdWithVideo(lessonId: string) {
    return prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        youtubeVideoId: true,
        durationSeconds: true,
        programId: true,
        moduleId: true,
        isFreePreview: true,
      },
    });
  }

  /**
   * Verificar si una lección es preview gratuita
   */
  async isFreePreview(lessonId: string): Promise<boolean> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { isFreePreview: true },
    });
    return lesson?.isFreePreview || false;
  }
}

export const lessonRepository = new LessonRepository();
