const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
});

async function testPromoCode() {
  try {
    console.log('🔍 Listando códigos de promoción activos...\n');
    
    const promoCodes = await stripe.promotionCodes.list({ limit: 10 });
    
    promoCodes.data.forEach(code => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Código:', code.code);
      console.log('ID:', code.id);
      console.log('Activo:', code.active ? '✅ Sí' : '❌ No');
      console.log('Cupón:', code.coupon.id);
      console.log('Vence:', code.expires_at ? new Date(code.expires_at * 1000).toLocaleString('es-MX') : 'No vence');
      console.log('Usos:', `${code.times_redeemed}/${code.max_redemptions || '∞'}`);
      console.log('');
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Para usar el código en checkout:');
    console.log('1. Abre: http://localhost:3002/bootcamp');
    console.log('2. Haz clic en "Inscribirme"');
    console.log('3. En Stripe, busca "Agregar código de promoción"');
    console.log('4. Ingresa: GALLO25');
    console.log('5. Verifica que el descuento se aplique: -$1,029.00\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPromoCode();
