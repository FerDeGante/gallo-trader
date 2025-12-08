const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
});

async function createPromotionCode() {
  try {
    // Fecha de vencimiento: Sábado 13 de diciembre 2025 a las 20:30
    const expirationDate = new Date('2025-12-13T20:30:00-06:00'); // Ajusta la zona horaria según tu ubicación
    const expirationTimestamp = Math.floor(expirationDate.getTime() / 1000);
    
    console.log('📝 Creando cupón con descuento fijo...');
    console.log('Vence:', expirationDate.toLocaleString('es-MX'));
    
    const coupon = await stripe.coupons.create({
      id: 'GALLO25',
      amount_off: 102900, // $1,029.00 en centavos
      currency: 'usd',
      duration: 'once',
      name: 'Descuento Especial Gallo',
      redeem_by: expirationTimestamp,
    });
    console.log('✅ Cupón creado:', coupon.id);
    console.log('Descuento fijo:', '$' + (coupon.amount_off / 100).toFixed(2));

    // Luego crear el código de promoción
    console.log('📝 Creando código de promoción...');
    const promoCode = await stripe.promotionCodes.create({
      coupon: 'GALLO25',
      code: 'GALLO25',
      max_redemptions: 100, // Límite de usos
      expires_at: expirationTimestamp,
    });
    
    console.log('✅ Código de promoción creado exitosamente!');
    console.log('Código:', promoCode.code);
    console.log('Descuento:', '$' + (coupon.amount_off / 100).toFixed(2));
    console.log('Vence:', new Date(promoCode.expires_at * 1000).toLocaleString('es-MX'));
    console.log('Usos máximos:', promoCode.max_redemptions);
    
  } catch (error) {
    if (error.code === 'resource_already_exists') {
      console.log('⚠️  El cupón GALLO25 ya existe en Stripe');
      console.log('Debes eliminarlo primero desde: https://dashboard.stripe.com/test/coupons');
      console.log('Luego vuelve a ejecutar este script');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

createPromotionCode();
