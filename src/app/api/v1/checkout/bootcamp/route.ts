import { NextRequest } from 'next/server';
import { errorResponse, successResponse } from '@/server/utils/response';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

/**
 * GET /api/v1/checkout/bootcamp
 * Redirigir directamente al checkout (para botones que hacen GET)
 */
export async function GET(request: NextRequest) {
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3002';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Master Funding Bootcamp',
              description: 'Programa completo con módulos integrales, herramientas y acceso a Discord VIP',
              images: ['https://gallotrader.com/bootcamp-cover.jpg'],
            },
            unit_amount: 202600, // $2,026.00 en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${origin}/bootcamp/success`,
      cancel_url: `${origin}/bootcamp`,
      customer_email: undefined,
      metadata: {
        product_type: 'bootcamp',
        bootcamp_name: 'Master Funding Bootcamp',
      },
    });

    return Response.redirect(session.url!, 303);
  } catch (error) {
    console.error('❌ Error en checkout bootcamp GET:', error);
    return errorResponse(error as Error);
  }
}

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
              description: 'Programa completo con módulos integrales, herramientas y acceso a Discord VIP',
              images: ['https://gallotrader.com/bootcamp-cover.jpg'],
            },
            unit_amount: 202600, // $2,026.00 en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
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
