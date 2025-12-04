import { NextRequest } from 'next/server';
import { stripe } from '@/server/lib/stripe';
import { paymentRepository } from '@/server/modules/payment/payment.repository';
import { enrollmentService } from '@/server/modules/enrollment/enrollment.service';
import { errorResponse, successResponse } from '@/server/utils/response';
import { getBootcampWelcomeEmailTemplate, getBootcampWelcomeEmailText } from '@/server/lib/email-templates';
import Stripe from 'stripe';

/**
 * Enviar email de bienvenida al bootcamp
 */
async function sendBootcampWelcomeEmail(email: string, session: Stripe.Checkout.Session) {
  const htmlContent = getBootcampWelcomeEmailTemplate(email, session);
  const textContent = getBootcampWelcomeEmailText(email, session);
  
  console.log(`
  📧 Email de bienvenida al bootcamp preparado para: ${email}
  Session ID: ${session.id}
  Monto: $${(session.amount_total || 0) / 100}
  `);
  
  // TODO: Integrar con tu servicio de email
  // Ejemplo con Resend:
  /*
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: 'Gallo Trader <bootcamp@gallotrader.com>',
    to: email,
    subject: '¡Bienvenido al Master Funding Bootcamp! 🎉',
    html: htmlContent,
    text: textContent,
  });
  */
  
  // Por ahora, solo logueamos el contenido
  console.log('Email HTML generado ✓');
  console.log('Email Text generado ✓');
}

/**
 * POST /api/v1/webhooks/stripe
 * Webhook para eventos de Stripe
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return errorResponse(new Error('No signature provided'), 400);
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET no configurado');
      return errorResponse(new Error('Webhook not configured'), 500);
    }

    // Verificar la firma del webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`📨 Webhook recibido: ${event.type}`);

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Obtener metadata
        const { userId, programId, paymentId, product_type } = session.metadata || {};

        // Verificar si es un pago del bootcamp
        if (product_type === 'bootcamp' && session.customer_email) {
          console.log(`🎓 Pago de bootcamp completado para ${session.customer_email}`);
          
          // Enviar email de bienvenida al bootcamp
          try {
            await sendBootcampWelcomeEmail(session.customer_email, session);
            console.log(`✅ Email de bienvenida enviado a ${session.customer_email}`);
          } catch (emailError) {
            console.error('Error enviando email de bienvenida:', emailError);
            // No fallar el webhook por error de email
          }
          break;
        }

        if (!programId) {
          console.error('programId faltante en checkout.session.completed');
          break;
        }

        // Si el userId es 'guest', significa que el usuario compró sin cuenta
        // El endpoint /api/v1/checkout/confirm se encargará de crear usuario y enrollment
        if (userId === 'guest') {
          console.log(`👤 Pago de invitado completado para programa ${programId}`);
          console.log(`   Email: ${session.customer_email}`);
          console.log(`   Session: ${session.id}`);
          // No hacemos nada aquí, el flujo de confirm lo manejará
          break;
        }

        if (!userId || !paymentId) {
          console.error('Metadata incompleta en checkout.session.completed');
          break;
        }

        // Buscar el pago
        const payment = await paymentRepository.findByProviderPaymentId(
          'STRIPE',
          session.id
        );

        if (!payment) {
          console.error(`Pago no encontrado para session ${session.id}`);
          break;
        }

        // Actualizar estado del pago
        await paymentRepository.updateStatus(
          payment.id,
          'SUCCEEDED',
          session as object
        );

        // Activar acceso al programa
        await enrollmentService.activateAccess({
          userId,
          programId,
          paymentId: payment.id,
          source: 'PAYMENT',
          notes: `Activado automáticamente por pago exitoso (Stripe Session: ${session.id})`,
        });

        console.log(`✅ Acceso activado para usuario ${userId} en programa ${programId}`);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        
        // Buscar el pago por el charge ID
        const payment = await paymentRepository.findByProviderPaymentId(
          'STRIPE',
          charge.id
        );

        if (payment) {
          await paymentRepository.updateStatus(
            payment.id,
            'REFUNDED',
            charge as object
          );
          
          console.log(`💰 Pago ${payment.id} marcado como REFUNDED`);
          // Nota: La revocación del enrollment se debería manejar manualmente por admin
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        
        const payment = await paymentRepository.findByProviderPaymentId(
          'STRIPE',
          paymentIntent.id
        );

        if (payment) {
          await paymentRepository.updateStatus(
            payment.id,
            'FAILED',
            paymentIntent as object
          );
          
          console.log(`❌ Pago ${payment.id} marcado como FAILED`);
        }
        break;
      }

      default:
        console.log(`⚠️ Evento no manejado: ${event.type}`);
    }

    return successResponse({ received: true });
  } catch (error) {
    console.error('Error procesando webhook de Stripe:', error);
    
    if (error instanceof Error && error.message.includes('signature')) {
      return errorResponse(new Error('Invalid signature'), 400);
    }
    
    return errorResponse(error as Error, 500);
  }
}
