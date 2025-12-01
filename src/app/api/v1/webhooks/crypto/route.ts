import { NextRequest } from 'next/server';
import { paymentRepository } from '@/server/modules/payment/payment.repository';
import { enrollmentService } from '@/server/modules/enrollment/enrollment.service';
import { errorResponse, successResponse } from '@/server/utils/response';
import { verifyCoinbaseSignature } from '@/server/lib/security';
import type { CoinbaseWebhookEvent } from '@/server/lib/coinbase';

/**
 * POST /api/v1/webhooks/crypto
 * Webhook para eventos de Coinbase Commerce
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-cc-webhook-signature');

    if (!signature) {
      return errorResponse(new Error('No signature provided'), 400);
    }

    if (!process.env.COINBASE_COMMERCE_WEBHOOK_SECRET) {
      console.error('COINBASE_COMMERCE_WEBHOOK_SECRET no configurado');
      return errorResponse(new Error('Webhook not configured'), 500);
    }

    // Verificar la firma del webhook
    const isValid = verifyCoinbaseSignature(
      body,
      signature,
      process.env.COINBASE_COMMERCE_WEBHOOK_SECRET
    );

    if (!isValid) {
      return errorResponse(new Error('Invalid signature'), 400);
    }

    const webhookEvent: CoinbaseWebhookEvent = JSON.parse(body);
    const event = webhookEvent.event;

    console.log(`📨 Webhook Coinbase recibido: ${event.type}`);

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'charge:confirmed': {
        // El pago fue confirmado en la blockchain
        const charge = event.data;
        const { userId, programId, paymentId } = charge.metadata;

        if (!userId || !programId || !paymentId) {
          console.error('Metadata incompleta en charge:confirmed');
          break;
        }

        // Buscar el pago
        const payment = await paymentRepository.findByProviderPaymentId(
          'COINBASE_COMMERCE',
          charge.code
        );

        if (!payment) {
          console.error(`Pago no encontrado para charge ${charge.code}`);
          break;
        }

        // Actualizar estado del pago
        await paymentRepository.updateStatus(
          payment.id,
          'SUCCEEDED',
          charge as unknown as object
        );

        // Activar acceso al programa
        await enrollmentService.activateAccess({
          userId,
          programId,
          paymentId: payment.id,
          source: 'PAYMENT',
          notes: `Activado automáticamente por pago en cripto (Coinbase Charge: ${charge.code})`,
        });

        console.log(
          `✅ Acceso activado para usuario ${userId} en programa ${programId} (crypto)`
        );
        break;
      }

      case 'charge:failed': {
        // El pago falló
        const charge = event.data;

        const payment = await paymentRepository.findByProviderPaymentId(
          'COINBASE_COMMERCE',
          charge.code
        );

        if (payment) {
          await paymentRepository.updateStatus(
            payment.id,
            'FAILED',
            charge as unknown as object
          );

          console.log(`❌ Pago crypto ${payment.id} marcado como FAILED`);
        }
        break;
      }

      case 'charge:pending': {
        // Pago detectado pero aún no confirmado
        const charge = event.data;

        const payment = await paymentRepository.findByProviderPaymentId(
          'COINBASE_COMMERCE',
          charge.code
        );

        if (payment) {
          await paymentRepository.updateStatus(
            payment.id,
            'REQUIRES_ACTION',
            charge as unknown as object
          );

          console.log(`⏳ Pago crypto ${payment.id} pendiente de confirmación`);
        }
        break;
      }

      default:
        console.log(`⚠️ Evento crypto no manejado: ${event.type}`);
    }

    return successResponse({ received: true });
  } catch (error) {
    console.error('Error procesando webhook de Coinbase:', error);

    if (error instanceof Error && error.message.includes('signature')) {
      return errorResponse(new Error('Invalid signature'), 400);
    }

    return errorResponse(error as Error, 500);
  }
}
