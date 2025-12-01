import { prisma } from '@/server/db';

export class ProgramRepository {
  /**
   * Obtener todos los programas (incluye inactivos para admin)
   */
  async findAll() {
    return prisma.program.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  /**
   * Obtener todos los programas activos
   */
  async findAllActive() {
    return prisma.program.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  /**
   * Obtener un programa por slug
   */
  async findBySlug(slug: string) {
    return prisma.program.findUnique({
      where: { slug },
    });
  }

  /**
   * Obtener un programa por ID
   */
  async findById(id: string) {
    return prisma.program.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  /**
   * Obtener un programa por slug con módulos y lecciones
   * Para mostrar en la landing (SIN youtubeVideoId)
   */
  async findBySlugWithContent(slug: string) {
    return prisma.program.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                slug: true,
                summary: true,
                durationSeconds: true,
                order: true,
                isFreePreview: true,
                isActive: true,
                // NO incluir youtubeVideoId en listados públicos
              },
            },
          },
        },
      },
    });
  }

  /**
   * Crear un programa
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(data: any) {
    return prisma.program.create({ data });
  }

  /**
   * Actualizar un programa
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, data: any) {
    return prisma.program.update({
      where: { id },
      data,
    });
  }

  /**
   * Eliminar un programa (soft delete - marcar como inactivo)
   */
  async softDelete(id: string) {
    return prisma.program.update({
      where: { id },
      data: { isActive: false },
    });
  }
}

export const programRepository = new ProgramRepository();
