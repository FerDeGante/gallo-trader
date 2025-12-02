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
    // Verificar que el programa existe y está activo
    const program = await programRepository.findById(input.programId);
    
    if (!program || !program.isActive) {
      throw new NotFoundError('Programa no encontrado o no disponible');
    }

    // Crear el registro de pago en estado PENDING solo si hay userId
    let payment = null;
    if (userId) {
      payment = await paymentRepository.create({
        userId,
        programId: program.id,
        amount: program.priceUsd,
        currency: 'USD',
        provider: 'STRIPE',
        providerPaymentId: 'pending', // Se actualizará con el session ID
        status: 'PENDING',
      });
    }

    // Crear sesión de Stripe Checkout
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

    // Actualizar el payment con el session ID si existe
    if (payment) {
      await paymentRepository.updateStatus(payment.id, 'PENDING', { sessionId: session.id });
    }

    // Tracking: Checkout iniciado
    if (userId) {
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
