import { coinbaseClient } from '@/server/lib/coinbase';
import { paymentRepository } from './payment.repository';
import { programRepository } from '../program/program.repository';
import { NotFoundError, ValidationError } from '@/server/utils/errors';
import type { CreateCryptoCheckoutInput } from './crypto-payment.schemas';

export class CryptoPaymentService {
  /**
   * Crear checkout de Coinbase Commerce
   */
  async createCoinbaseCheckout(
    userId: string,
    input: CreateCryptoCheckoutInput
  ) {
    if (!coinbaseClient) {
      throw new ValidationError('Pago con criptomonedas no disponible en este momento');
    }

    // Verificar que el programa existe y está activo
    const program = await programRepository.findById(input.programId);

    if (!program || !program.isActive) {
      throw new NotFoundError('Programa no encontrado o no disponible');
    }

    // Crear el registro de pago en estado PENDING
    const payment = await paymentRepository.create({
      userId,
      programId: program.id,
      amount: program.priceUsd,
      currency: 'USD',
      provider: 'COINBASE_COMMERCE',
      providerPaymentId: 'pending',
      status: 'PENDING',
    });

    // Funcionalidad de Coinbase Commerce temporalmente deshabilitada
    throw new Error('Coinbase Commerce no está disponible actualmente');
    
    /* Comentado para referencia futura - Requiere reinstalar coinbase-commerce-node
    try {
      const chargeData = {
        name: program.title,
        description: program.subtitle || 'Acceso al programa premium',
        local_price: {
          amount: (program.priceUsd / 100).toFixed(2),
          currency: 'USD',
        },
        pricing_type: 'fixed_price',
        metadata: {
          userId,
          programId: program.id,
          paymentId: payment.id,
        },
        redirect_url: input.successUrl || `${process.env.NEXTAUTH_URL}/checkout/success`,
        cancel_url: input.cancelUrl || `${process.env.NEXTAUTH_URL}/checkout/cancel`,
      };

      const charge = await Charge.create(chargeData);

      await paymentRepository.updateStatus(payment.id, 'PENDING', {
        chargeId: charge.id,
        chargeCode: charge.code,
      });

      return {
        chargeId: charge.id,
        chargeCode: charge.code,
        hostedUrl: charge.hosted_url,
        paymentId: payment.id,
      };
    } catch (error) {
      console.error('Error creando charge de Coinbase:', error);
      
      await paymentRepository.updateStatus(payment.id, 'FAILED');
      
      throw new ValidationError('Error al procesar el pago con criptomonedas');
    }
    */
  }
}

export const cryptoPaymentService = new CryptoPaymentService();
