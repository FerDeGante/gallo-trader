/**
 * Validador de configuración de Stripe
 * 
 * Verifica que todas las variables de entorno estén correctamente configuradas
 * y que las credenciales de Stripe funcionen.
 */

import 'dotenv/config';
import Stripe from 'stripe';

interface ValidationResult {
  valid: boolean;
  message: string;
  details?: string;
}

async function validateStripeConfig(): Promise<void> {
  console.log('🔍 VALIDANDO CONFIGURACIÓN DE STRIPE\n');
  console.log('═══════════════════════════════════════\n');

  const results: ValidationResult[] = [];

  // ===== 1. VERIFICAR VARIABLES DE ENTORNO =====
  console.log('📋 1. Verificando variables de entorno...\n');

  // STRIPE_SECRET_KEY
  if (!process.env.STRIPE_SECRET_KEY) {
    results.push({
      valid: false,
      message: '❌ STRIPE_SECRET_KEY no configurada',
      details: 'Agrega tu clave secreta en .env: STRIPE_SECRET_KEY=sk_test_...'
    });
  } else if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    results.push({
      valid: false,
      message: '❌ STRIPE_SECRET_KEY tiene formato inválido',
      details: 'Debe comenzar con sk_test_ o sk_live_'
    });
  } else {
    const keyType = process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') ? 'TEST' : 'LIVE';
    results.push({
      valid: true,
      message: `✅ STRIPE_SECRET_KEY configurada (${keyType} mode)`,
      details: process.env.STRIPE_SECRET_KEY.substring(0, 20) + '...'
    });
  }

  // STRIPE_PRICE_ID
  if (!process.env.STRIPE_PRICE_ID) {
    results.push({
      valid: false,
      message: '❌ STRIPE_PRICE_ID no configurada',
      details: 'Agrega el Price ID en .env: STRIPE_PRICE_ID=price_...'
    });
  } else if (!process.env.STRIPE_PRICE_ID.startsWith('price_')) {
    results.push({
      valid: false,
      message: '❌ STRIPE_PRICE_ID tiene formato inválido',
      details: 'Debe comenzar con price_'
    });
  } else {
    results.push({
      valid: true,
      message: '✅ STRIPE_PRICE_ID configurada',
      details: process.env.STRIPE_PRICE_ID
    });
  }

  // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    results.push({
      valid: false,
      message: '❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY no configurada',
      details: 'Agrega tu clave pública en .env'
    });
  } else if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_')) {
    results.push({
      valid: false,
      message: '❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY tiene formato inválido',
      details: 'Debe comenzar con pk_test_ o pk_live_'
    });
  } else {
    const keyType = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_') ? 'TEST' : 'LIVE';
    results.push({
      valid: true,
      message: `✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY configurada (${keyType} mode)`,
      details: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 20) + '...'
    });
  }

  // NEXTAUTH_URL
  if (!process.env.NEXTAUTH_URL) {
    results.push({
      valid: false,
      message: '❌ NEXTAUTH_URL no configurada',
      details: 'Necesaria para URLs de redirect del checkout'
    });
  } else {
    results.push({
      valid: true,
      message: '✅ NEXTAUTH_URL configurada',
      details: process.env.NEXTAUTH_URL
    });
  }

  // Mostrar resultados de variables de entorno
  results.forEach(r => {
    console.log(`   ${r.message}`);
    if (r.details) {
      console.log(`      ${r.details}`);
    }
  });
  console.log('');

  // ===== 2. PROBAR CONEXIÓN CON STRIPE =====
  if (process.env.STRIPE_SECRET_KEY?.startsWith('sk_')) {
    console.log('📋 2. Probando conexión con Stripe API...\n');

    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-11-17.clover',
      });

      // Intentar recuperar información de la cuenta
      const account = await stripe.accounts.retrieve();
      
      console.log('   ✅ Conexión exitosa con Stripe');
      console.log(`   📧 Email: ${account.email || 'N/A'}`);
      console.log(`   🏢 Business type: ${account.business_type || 'N/A'}`);
      console.log(`   🌍 Country: ${account.country || 'N/A'}`);
      console.log('');

      // ===== 3. VERIFICAR EL PRICE ID =====
      if (process.env.STRIPE_PRICE_ID?.startsWith('price_')) {
        console.log('📋 3. Verificando Price ID...\n');

        try {
          const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID);
          
          console.log('   ✅ Price encontrado');
          console.log(`   💰 Monto: ${price.unit_amount! / 100} ${price.currency.toUpperCase()}`);
          console.log(`   🔄 Tipo: ${price.type}`);
          console.log(`   ✅ Activo: ${price.active ? 'Sí' : 'No'}`);
          
          if (price.product) {
            const product = await stripe.products.retrieve(price.product as string);
            console.log(`   📦 Producto: ${product.name}`);
            console.log(`   📝 Descripción: ${product.description || 'N/A'}`);
          }
          console.log('');

          if (!price.active) {
            console.log('   ⚠️  WARNING: El Price está inactivo');
            console.log('   ℹ️  Actívalo en el dashboard de Stripe\n');
          }

        } catch (error) {
          console.log('   ❌ Error al verificar Price ID');
          console.log(`   ℹ️  ${(error as Error).message}\n`);
        }
      }

      // ===== 4. CREAR TEST CHECKOUT SESSION =====
      console.log('📋 4. Creando test checkout session...\n');

      try {
        const testSession = await stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
          line_items: [
            {
              price: process.env.STRIPE_PRICE_ID!,
              quantity: 1,
            },
          ],
          metadata: {
            test: 'validation',
          },
          customer_email: 'test@example.com',
          success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
        });

        console.log('   ✅ Test checkout session creada exitosamente!');
        console.log(`   🆔 Session ID: ${testSession.id}`);
        console.log(`   🔗 URL: ${testSession.url}`);
        console.log(`   ⏰ Expira: ${new Date(testSession.expires_at * 1000).toLocaleString()}`);
        console.log('');

        // Cancelar la sesión de test
        await stripe.checkout.sessions.expire(testSession.id);
        console.log('   🗑️  Test session cancelada (cleanup)\n');

      } catch (error) {
        console.log('   ❌ Error al crear test checkout session');
        console.log(`   ℹ️  ${(error as Error).message}\n`);
      }

    } catch (error) {
      console.log('   ❌ Error de conexión con Stripe');
      console.log(`   ℹ️  ${(error as Error).message}\n`);
    }
  }

  // ===== RESUMEN FINAL =====
  console.log('═══════════════════════════════════════');
  console.log('📊 RESUMEN DE VALIDACIÓN:');
  console.log('═══════════════════════════════════════\n');

  const validCount = results.filter(r => r.valid).length;
  const totalCount = results.length;

  if (validCount === totalCount) {
    console.log('✅ TODAS LAS VALIDACIONES PASARON');
    console.log('🎉 Tu configuración de Stripe está lista!\n');
    console.log('🚀 Próximos pasos:');
    console.log('   1. Ejecuta: npm run test:checkout');
    console.log('   2. Completa un pago de prueba');
    console.log('   3. Verifica el enrollment en /aula\n');
  } else {
    console.log(`⚠️  ${totalCount - validCount}/${totalCount} validaciones fallaron`);
    console.log('🔧 Revisa los errores arriba y corrígelos\n');
  }

  console.log('═══════════════════════════════════════\n');
}

// Ejecutar validación
validateStripeConfig()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error crítico:', error);
    process.exit(1);
  });
