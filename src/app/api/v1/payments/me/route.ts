import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { paymentService } from '@/server/modules/payment/payment.service';
import { errorResponse, successResponse } from '@/server/utils/response';

/**
 * GET /api/v1/payments/me
 * Obtener historial de pagos del usuario autenticado
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const payments = await paymentService.getUserPayments(user.id);
    
    return successResponse(payments);
  } catch (error) {
    return errorResponse(error as Error);
  }
}
