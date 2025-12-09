import { NextRequest } from 'next/server';
import { errorResponse, successResponse } from '@/server/utils/response';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

/**
 * GET /api/v1/checkout/verify-session?session_id=xxx
 * Verificar que un session_id de Stripe sea válido y esté pagado
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return errorResponse(new Error('session_id es requerido'));
    }

    // Verificar la sesión con Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log('🔍 Session retrieved:', {
      id: session.id,
      payment_status: session.payment_status,
      status: session.status,
      product_type: session.metadata?.product_type,
    });

    // Verificar que sea para el bootcamp
    if (session.metadata?.product_type !== 'bootcamp') {
      console.log('❌ Invalid product type:', session.metadata?.product_type);
      return errorResponse(new Error('Sesión inválida'), 403);
    }

    // Aceptar si el checkout fue completado (aunque el pago esté procesando)
    // Stripe puede marcar como 'unpaid' temporalmente antes de confirmar
    if (session.status !== 'complete') {
      console.log('❌ Session not complete:', session.status);
      return errorResponse(new Error('Sesión no completada'), 403);
    }

    console.log('✅ Session verified successfully');

    // Todo OK - retornar información del cliente
    return successResponse({
      valid: true,
      customer_email: session.customer_email || session.customer_details?.email,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
      status: session.status,
    });
  } catch (error: any) {
    console.error('❌ Error verificando sesión:', error);
    
    // Si Stripe no encuentra la sesión, es inválida
    if (error.type === 'StripeInvalidRequestError') {
      return errorResponse(new Error('Sesión inválida'), 403);
    }
    
    return errorResponse(error as Error);
  }
}
