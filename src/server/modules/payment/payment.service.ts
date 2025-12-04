import { stripe } from '@/server/lib/stripe';
import { paymentRepository } from './payment.repository';
import { programRepository } from '../program/program.repository';
import { NotFoundError } from '@/server/utils/errors';
import { trackEvent } from '@/server/lib/analytics-setup';
import type { CreateCheckoutInput } from './payment.schemas';

export class PaymentService {
  /**
   * Crear sesión de checkout de Stripe
   */
  async createStripeCheckout(
    userId: string | null,
    input: CreateCheckoutInput
  ) {
    console.log('💳 Iniciando creación de checkout session...', {
      userId: userId || 'guest',
      programId: input.programId,
      customerEmail: input.customerEmail,
    });

    // Verificar que el programa existe y está activo
    const program = await programRepository.findById(input.programId);
    
    if (!program || !program.isActive) {
      console.error('❌ Programa no encontrado o inactivo:', input.programId);
      throw new NotFoundError('Programa no encontrado o no disponible');
    }

    console.log('✅ Programa encontrado:', {
      id: program.id,
      title: program.title,
      price: program.priceUsd,
    });

    // Crear el registro de pago en estado PENDING solo si hay userId
    let payment = null;
    if (userId) {
      console.log('💾 Creando registro de pago en DB...');
      payment = await paymentRepository.create({
        userId,
        programId: program.id,
        amount: program.priceUsd,
        currency: 'USD',
        provider: 'STRIPE',
        providerPaymentId: 'pending', // Se actualizará con el session ID
        status: 'PENDING',
      });
      console.log('✅ Payment creado:', { id: payment.id, amount: payment.amount });
    } else {
      console.log('👤 Usuario guest - pago se creará después del checkout');
    }

    // Validar variables de entorno necesarias
    if (!process.env.STRIPE_PRICE_ID) {
      console.error('❌ STRIPE_PRICE_ID no configurado');
      throw new Error('Configuración de Stripe incompleta');
    }

    if (!process.env.NEXTAUTH_URL) {
      console.error('❌ NEXTAUTH_URL no configurado');
      throw new Error('Configuración de URLs incompleta');
    }

    console.log('🔧 Configuración Stripe:', {
      priceId: process.env.STRIPE_PRICE_ID,
      baseUrl: process.env.NEXTAUTH_URL,
    });

    // Crear sesión de Stripe Checkout
    console.log('🎫 Creando sesión de Stripe Checkout...');
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Usar el Price ID configurado
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId || 'guest',
        programId: program.id,
        paymentId: payment?.id || 'pending',
      },
      customer_email: input.customerEmail, // Email del cliente para el checkout
      success_url: `${input.successUrl || process.env.NEXTAUTH_URL + '/checkout/success'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: input.cancelUrl || `${process.env.NEXTAUTH_URL}/checkout/cancel`,
    });

    console.log('✅ Sesión de Stripe creada:', {
      sessionId: session.id,
      url: session.url,
      expiresAt: new Date(session.expires_at * 1000),
    });

    // Actualizar el payment con el session ID si existe
    if (payment) {
      console.log('🔄 Actualizando payment con session ID...');
      await paymentRepository.updateStatus(payment.id, 'PENDING', { sessionId: session.id });
      console.log('✅ Payment actualizado');
    }

    // Tracking: Checkout iniciado
    if (userId) {
      console.log('📊 Tracking checkout_started event...');
      trackEvent({
        event: 'checkout_started',
        userId,
        programId: program.id,
        programSlug: program.slug,
        programTitle: program.title,
        programPrice: program.priceUsd,
        paymentId: payment?.id,
        paymentProvider: 'STRIPE',
        paymentAmount: program.priceUsd,
        paymentCurrency: 'USD',
      });
    }

    console.log('🎉 Checkout session creada exitosamente');
    return {
      sessionId: session.id,
      url: session.url,
      paymentId: payment?.id,
    };
  }

  /**
   * Obtener pagos de un usuario
   */
  async getUserPayments(userId: string) {
    return paymentRepository.findByUserId(userId);
  }
}

export const paymentService = new PaymentService();
