import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { programService } from '@/server/modules/program/program.service';
import { updateProgramSchema } from '@/server/modules/program/program.schemas';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';

/**
 * GET /api/v1/admin/programs/[programId]
 * Obtener detalle de un programa (incluye inactivos) - Solo admin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    await requireAdmin();
    
    const { programId } = await params;
    const program = await programService.getProgramById(programId);
    
    return successResponse(program);
  } catch (error) {
    return errorResponse(error as Error);
  }
}

/**
 * PATCH /api/v1/admin/programs/[programId]
 * Actualizar un programa - Solo admin
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    await requireAdmin();
    
    const { programId } = await params;
    const body = await request.json();
    const validatedData = updateProgramSchema.parse(body);
    
    const program = await programService.updateProgram(programId, validatedData);
    
    return successResponse(program);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return errorResponse(new ValidationError('Datos inválidos', error));
    }
    return errorResponse(error as Error);
  }
}

/**
 * DELETE /api/v1/admin/programs/[programId]
 * Desactivar un programa (soft delete) - Solo admin
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    await requireAdmin();
    
    const { programId } = await params;
    await programService.deactivateProgram(programId);
    
    return successResponse({ message: 'Programa desactivado exitosamente' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
