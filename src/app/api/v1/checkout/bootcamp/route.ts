import { NextRequest } from 'next/server';
import { errorResponse, successResponse } from '@/server/utils/response';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

/**
 * POST /api/v1/checkout/bootcamp
 * Crear sesión de checkout de Stripe para el Master Funding Bootcamp
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { successUrl, cancelUrl } = body;
    
    if (!successUrl || !cancelUrl) {
      return errorResponse(new Error('successUrl y cancelUrl son requeridos'));
    }

    // Crear sesión de checkout para el bootcamp
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Master Funding Bootcamp',
              description: '7 días intensivos para conseguir tu primera cuenta fondeada de $100K',
              images: ['https://gallotrader.com/bootcamp-cover.jpg'],
            },
            unit_amount: 100000, // $1,000.00 en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'required',
      customer_email: undefined, // Stripe pedirá el email
      metadata: {
        product_type: 'bootcamp',
        bootcamp_name: 'Master Funding Bootcamp',
      },
    });

    return successResponse({ url: session.url });
  } catch (error) {
    console.error('❌ Error en checkout bootcamp:', error);
    return errorResponse(error as Error);
  }
}
