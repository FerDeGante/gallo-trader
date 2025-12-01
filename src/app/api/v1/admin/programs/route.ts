import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { programService } from '@/server/modules/program/program.service';
import { createProgramSchema } from '@/server/modules/program/program.schemas';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';

/**
 * GET /api/v1/admin/programs
 * Listar todos los programas (incluyendo inactivos) - Solo admin
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    
    const programs = await programService.getAllPrograms();
    return successResponse(programs);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

/**
 * POST /api/v1/admin/programs
 * Crear un nuevo programa - Solo admin
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    
    const body = await request.json();
    const validatedData = createProgramSchema.parse(body);
    
    const program = await programService.createProgram(validatedData);
    return successResponse(program, );
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return errorResponse(new ValidationError('Datos inválidos', error));
    }
    return errorResponse(error as Error);
  }
}
