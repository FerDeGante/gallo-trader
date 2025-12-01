import { NotFoundError } from '@/server/utils/errors';
import { programRepository } from './program.repository';
import type { CreateProgramInput, UpdateProgramInput } from './program.schemas';

export class ProgramService {
  /**
   * Obtener todos los programas (para admin)
   */
  async getAllPrograms() {
    return programRepository.findAll();
  }

  /**
   * Obtener todos los programas activos (para listado público)
   */
  async getActivePrograms() {
    return programRepository.findAllActive();
  }

  /**
   * Obtener detalle de un programa por slug con su contenido
   * (para landing page y página de ventas)
   */
  async getProgramBySlug(slug: string) {
    const program = await programRepository.findBySlugWithContent(slug);
    
    if (!program) {
      throw new NotFoundError('Programa no encontrado');
    }

    return program;
  }

  /**
   * Obtener programa por ID (para admin)
   */
  async getProgramById(id: string) {
    const program = await programRepository.findById(id);
    
    if (!program) {
      throw new NotFoundError('Programa no encontrado');
    }

    return program;
  }

  /**
   * Crear un nuevo programa (admin)
   */
  async createProgram(data: CreateProgramInput) {
    return programRepository.create(data);
  }

  /**
   * Actualizar un programa (admin)
   */
  async updateProgram(id: string, data: UpdateProgramInput) {
    const program = await programRepository.findById(id);
    
    if (!program) {
      throw new NotFoundError('Programa no encontrado');
    }

    return programRepository.update(id, data);
  }

  /**
   * Desactivar un programa (admin)
   */
  async deactivateProgram(id: string) {
    return programRepository.softDelete(id);
  }
}

export const programService = new ProgramService();
