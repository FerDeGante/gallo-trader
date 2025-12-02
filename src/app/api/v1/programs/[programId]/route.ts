import { NextRequest } from 'next/server';
import { programService } from '@/server/modules/program/program.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/programs/[programId]
 * Obtener detalle de un programa con módulos y lecciones (público)
 * Acepta tanto slug como ID numérico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ programId: string }> }
) {
  try {
    const { programId } = await params;
    
    // Verificar si es un número (ID) o string (slug)
    const isNumeric = /^\d+$/.test(programId);
    
    let program;
    if (isNumeric) {
      program = await programService.getProgramById(programId);
    } else {
      program = await programService.getProgramBySlug(programId);
    }
    
    return successResponse(program);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
