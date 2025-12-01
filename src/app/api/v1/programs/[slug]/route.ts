import { NextRequest } from 'next/server';
import { programService } from '@/server/modules/program/program.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/programs/[slug]
 * Obtener detalle de un programa con módulos y lecciones (público)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const program = await programService.getProgramBySlug(slug);
    return successResponse(program);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
