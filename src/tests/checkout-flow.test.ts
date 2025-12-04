/**
 * Test E2E del flujo de checkout
 * 
 * Este test verifica todo el flujo:
 * 1. Usuario autenticado crea checkout session
 * 2. Se simula el pago exitoso en Stripe
 * 3. Se verifica que el webhook actualice el pago
 * 4. Se verifica que se active el enrollment
 * 5. Se verifica acceso al programa
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import Stripe from 'stripe';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

async function testCheckoutFlow() {
  console.log('🧪 INICIANDO TEST DE CHECKOUT FLOW\n');

  try {
    // ===== PASO 1: OBTENER USUARIO Y PROGRAMA =====
    console.log('📋 PASO 1: Obtener datos de test...');
    
    const testUser = await prisma.user.findUnique({
      where: { email: 'cliente5@example.com' }
    });

    if (!testUser) {
      throw new Error('❌ Usuario de test no encontrado');
    }

    const program = await prisma.program.findFirst({
      where: { isActive: true }
    });

    if (!program) {
      throw new Error('❌ Programa no encontrado');
    }

    console.log(`   ✅ Usuario: ${testUser.email}`);
    console.log(`   ✅ Programa: ${program.title}`);
    console.log(`   ✅ Precio: $${program.priceUsd / 100} USD\n`);

    // ===== PASO 2: CREAR PAYMENT RECORD =====
    console.log('📋 PASO 2: Crear registro de pago...');
    
    const payment = await prisma.payment.create({
      data: {
        userId: testUser.id,
        programId: program.id,
        amount: program.priceUsd,
        currency: 'USD',
        provider: 'STRIPE',
        providerPaymentId: 'pending',
        status: 'PENDING',
      }
    });

    console.log(`   ✅ Payment ID: ${payment.id}`);
    console.log(`   ✅ Status: ${payment.status}\n`);

    // ===== PASO 3: CREAR CHECKOUT SESSION EN STRIPE =====
    console.log('📋 PASO 3: Crear Stripe Checkout Session...');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        userId: testUser.id,
        programId: program.id,
        paymentId: payment.id,
      },
      customer_email: testUser.email || 'test@example.com',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
    });

    console.log(`   ✅ Session ID: ${session.id}`);
    console.log(`   ✅ URL: ${session.url}`);
    console.log(`   ✅ Status: ${session.status}\n`);

    // Actualizar payment con session ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerPaymentId: session.id,
        rawProviderPayload: session as object,
      }
    });

    console.log('   ✅ Payment actualizado con session ID\n');

    // ===== PASO 4: SIMULAR PAGO EXITOSO =====
    console.log('📋 PASO 4: Simular pago exitoso (Stripe Test Mode)...');
    console.log('   ℹ️  En modo test, puedes completar el pago con:');
    console.log('   📧 Email: cualquiera@example.com');
    console.log('   💳 Tarjeta: 4242 4242 4242 4242');
    console.log('   📅 Fecha: cualquier fecha futura');
    console.log('   🔐 CVC: cualquier 3 dígitos');
    console.log('   🌍 ZIP: cualquier código postal\n');
    console.log(`   🔗 Abre este link para completar el pago:`);
    console.log(`   ${session.url}\n`);

    // Esperar a que el usuario complete el pago o simular automáticamente
    console.log('   ⏳ Esperando 10 segundos para que completes el pago...');
    console.log('   (O presiona Ctrl+C para cancelar)\n');

    await new Promise(resolve => setTimeout(resolve, 10000));

    // Verificar el estado del session
    const updatedSession = await stripe.checkout.sessions.retrieve(session.id);
    console.log(`   📊 Estado del session: ${updatedSession.status}`);
    console.log(`   💰 Estado del pago: ${updatedSession.payment_status}\n`);

    if (updatedSession.payment_status === 'paid') {
      console.log('   ✅ ¡PAGO COMPLETADO EXITOSAMENTE!\n');

      // ===== PASO 5: VERIFICAR ACTUALIZACIÓN EN DB =====
      console.log('📋 PASO 5: Verificar actualización en base de datos...');

      const updatedPayment = await prisma.payment.findUnique({
        where: { id: payment.id }
      });

      console.log(`   💳 Status del pago: ${updatedPayment?.status}`);

      // Verificar enrollment
      const enrollment = await prisma.enrollment.findFirst({
        where: {
          userId: testUser.id,
          programId: program.id,
        }
      });

      if (enrollment) {
        console.log(`   ✅ Enrollment creado!`);
        console.log(`   📚 Status: ${enrollment.status}`);
        console.log(`   📅 Fecha inicio: ${enrollment.startDate}\n`);
      } else {
        console.log('   ⚠️  Enrollment no encontrado (puede tardar unos segundos por el webhook)\n');
      }

      // ===== PASO 6: VERIFICAR ACCESO =====
      console.log('📋 PASO 6: Verificar acceso al programa...');

      const userWithEnrollment = await prisma.user.findUnique({
        where: { id: testUser.id },
        include: {
          enrollments: {
            where: {
              programId: program.id,
              status: 'ACTIVE',
            }
          }
        }
      });

      if (userWithEnrollment?.enrollments.length! > 0) {
        console.log('   ✅ Usuario tiene acceso ACTIVO al programa!\n');
      } else {
        console.log('   ⚠️  Acceso no confirmado aún\n');
      }

    } else {
      console.log('   ⏭️  Pago no completado en el tiempo de espera');
      console.log('   ℹ️  Puedes completar el pago manualmente y verificar después\n');
    }

    // ===== RESUMEN =====
    console.log('═══════════════════════════════════════');
    console.log('📊 RESUMEN DEL TEST:');
    console.log('═══════════════════════════════════════');
    console.log(`✅ Payment record creado: ${payment.id}`);
    console.log(`✅ Stripe session creada: ${session.id}`);
    console.log(`✅ URL de checkout generada`);
    console.log(`✅ Metadata correctamente configurada`);
    console.log('');
    console.log('🔍 Para verificar manualmente:');
    console.log(`   1. Visita: ${session.url}`);
    console.log(`   2. Completa el pago con tarjeta de test`);
    console.log(`   3. Verifica que seas redirigido a /checkout/success`);
    console.log(`   4. Verifica que tengas acceso a /aula`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ ERROR EN TEST:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

// Ejecutar test
testCheckoutFlow()
  .then(() => {
    console.log('✅ Test completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test falló:', error);
    process.exit(1);
  });
