import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { cryptoPaymentService } from '@/server/modules/payment/crypto-payment.service';
import { createCryptoCheckoutSchema } from '@/server/modules/payment/crypto-payment.schemas';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';

/**
 * POST /api/v1/checkout/crypto
 * Crear checkout de Coinbase Commerce para pago con criptomonedas
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await request.json();
    const validatedData = createCryptoCheckoutSchema.parse(body);

    const checkout = await cryptoPaymentService.createCoinbaseCheckout(
      user.id,
      validatedData
    );

    return successResponse(checkout);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return errorResponse(new ValidationError('Datos inválidos', error));
    }
    return errorResponse(error as Error);
  }
}
