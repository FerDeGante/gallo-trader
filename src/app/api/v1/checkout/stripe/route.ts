import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { paymentService } from '@/server/modules/payment/payment.service';
import { createCheckoutSchema } from '@/server/modules/payment/payment.schemas';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';

/**
 * POST /api/v1/checkout/stripe
 * Crear sesión de checkout de Stripe
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const body = await request.json();
    const validatedData = createCheckoutSchema.parse(body);
    
    const checkout = await paymentService.createStripeCheckout(user.id, validatedData);
    
    return successResponse(checkout);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return errorResponse(new ValidationError('Datos inválidos', error));
    }
    return errorResponse(error as Error);
  }
}
