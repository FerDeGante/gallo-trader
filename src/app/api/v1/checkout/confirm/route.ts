import { NextRequest } from 'next/server';
import { stripe } from '@/server/lib/stripe';
import { prisma } from '@/server/db';
import { errorResponse, successResponse } from '@/server/utils/response';
import { ValidationError } from '@/server/utils/errors';
import bcrypt from 'bcryptjs';

/**
 * POST /api/v1/checkout/confirm
 * Confirmar pago de Stripe y crear usuario/enrollment automáticamente
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      throw new ValidationError('Session ID es requerido');
    }

    // Obtener la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new ValidationError('Sesión de checkout no encontrada');
    }

    // Verificar que el pago fue exitoso
    if (session.payment_status !== 'paid') {
      throw new ValidationError('El pago no ha sido completado');
    }

    const customerEmail = session.customer_email || session.customer_details?.email;
    if (!customerEmail) {
      throw new ValidationError('No se encontró el email del cliente');
    }

    const programId = session.metadata?.programId;
    if (!programId) {
      throw new ValidationError('No se encontró el ID del programa');
    }

    // Verificar si el usuario ya existe
    let user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    let newUser = false;
    let tempPassword: string | null = null;

    // Si el usuario no existe, crearlo
    if (!user) {
      newUser = true;
      
      // Generar contraseña temporal
      tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
      const passwordHash = await bcrypt.hash(tempPassword, 10);

      // Extraer nombre del email o usar nombre de Stripe
      const name = session.customer_details?.name || 
                   customerEmail.split('@')[0];

      user = await prisma.user.create({
        data: {
          email: customerEmail,
          name,
          passwordHash,
          role: 'STUDENT',
          emailVerified: new Date(), // Auto-verificado porque pagó
        },
      });
    }

    // Verificar si ya tiene enrollment activo
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        programId,
        status: 'ACTIVE',
      },
    });

    if (!existingEnrollment) {
      // Buscar pago existente o crear uno nuevo
      let payment = await prisma.payment.findFirst({
        where: {
          providerPaymentId: session.payment_intent as string || session.id,
        },
      });

      if (!payment) {
        // Crear nuevo pago
        payment = await prisma.payment.create({
          data: {
            userId: user.id,
            programId,
            amount: session.amount_total || 0,
            currency: 'USD',
            status: 'SUCCEEDED',
            provider: 'STRIPE',
            providerPaymentId: session.payment_intent as string || session.id,
            providerCustomerId: session.customer as string,
            rawProviderPayload: session as object,
          },
        });
      } else {
        // Actualizar pago existente
        payment = await prisma.payment.update({
          where: { id: payment.id },
          data: {
            userId: user.id,
            status: 'SUCCEEDED',
            rawProviderPayload: session as object,
          },
        });
      }

      // Crear enrollment
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          programId,
          status: 'ACTIVE',
          source: 'PAYMENT',
          paymentId: payment.id,
          startDate: new Date(),
        },
      });
    }

    return successResponse({
      message: 'Pago confirmado y acceso activado',
      newUser,
      credentials: newUser ? {
        email: customerEmail,
        tempPassword,
      } : null,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    console.error('Error confirmando checkout:', error);
    return errorResponse(error as Error);
  }
}
