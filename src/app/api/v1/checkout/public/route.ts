import { NextRequest } from 'next/server';
import { paymentService } from '@/server/modules/payment/payment.service';
import { createCheckoutSchema } from '@/server/modules/payment/payment.schemas';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';

/**
 * POST /api/v1/checkout/public
 * Crear sesión de checkout de Stripe sin autenticación
 * Para usuarios que aún no tienen cuenta
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📦 Body recibido:', body);
    
    const validatedData = createCheckoutSchema.parse(body);
    console.log('✅ Datos validados:', validatedData);
    
    // Crear checkout sin userId (usuario invitado)
    const checkout = await paymentService.createStripeCheckout(null, validatedData);
    
    return successResponse(checkout);
  } catch (error) {
    console.error('❌ Error en checkout público:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return errorResponse(new ValidationError('Datos inválidos', error));
    }
    return errorResponse(error as Error);
  }
}
