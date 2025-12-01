import { NextRequest } from 'next/server';
import { programService } from '@/server/modules/program/program.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/programs
 * Listar todos los programas activos (público)
 */
export async function GET(request: NextRequest) {
  try {
    const programs = await programService.getActivePrograms();
    return successResponse(programs);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
