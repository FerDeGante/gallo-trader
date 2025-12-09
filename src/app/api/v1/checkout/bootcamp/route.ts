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
    // Obtener el origin correcto
    const origin = request.headers.get('origin') 
      || request.headers.get('referer')?.replace(/\/$/, '').split('/').slice(0, 3).join('/')
      || `${request.nextUrl.protocol}//${request.nextUrl.host}`
      || 'http://localhost:3002';
    
    console.log('🔍 Creating checkout session with origin:', origin);
    
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
      success_url: `${origin}/bootcamp/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bootcamp`,
      customer_email: undefined,
      metadata: {
        product_type: 'bootcamp',
        bootcamp_name: 'Master Funding Bootcamp',
      },
    });

    console.log('✅ Checkout session created:', session.id);
    console.log('📧 Success URL:', `${origin}/bootcamp/success?session_id={CHECKOUT_SESSION_ID}`);
    console.log('🔗 Redirect URL:', session.url);

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

    // Añadir session_id a la URL de éxito
    const successUrlWithSession = successUrl.includes('?') 
      ? `${successUrl}&session_id={CHECKOUT_SESSION_ID}`
      : `${successUrl}?session_id={CHECKOUT_SESSION_ID}`;

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
      success_url: successUrlWithSession,
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
