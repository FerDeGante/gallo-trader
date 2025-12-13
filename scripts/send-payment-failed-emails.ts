import { config } from 'dotenv';
import { Resend } from 'resend';
import { PaymentFailedMXNEmail } from '../src/lib/email-templates/payment-failed-mxn';
import * as React from 'react';

// Cargar variables de entorno
config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

const recipients = [
  { email: 'ferdegante.22@gmail.com', nombre: 'Fernando' }, // Email de prueba
  // { email: 'yebra.ruben108@gmail.com', nombre: 'Ruben' },
  // { email: 'fgm741092@gmail.com', nombre: 'Francisco' },
  // { email: 'franyelsa@hotmail.com', nombre: 'Francisco' },
  // { email: 'oscard88@gmail.com', nombre: 'José Oscar' },
];

async function sendEmails() {
  console.log('🚀 Iniciando envío de emails...\n');

  for (const recipient of recipients) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Master Funding Bootcamp <team@mfb.mx>',
        to: [recipient.email],
        replyTo: 'team@mfb.mx',
        subject: 'Ya quedó en MXN (y con tu descuento) — entra aquí y termina tu acceso',
        react: PaymentFailedMXNEmail({
          nombre: recipient.nombre,
          checkoutUrl: 'https://www.mfb.mx/api/v1/checkout/bootcamp',
          codigoDescuento: 'GALLO25',
        }) as React.ReactElement,
      });

      if (error) {
        console.error(`❌ Error enviando a ${recipient.email}:`, error);
      } else {
        console.log(`✅ Email enviado a ${recipient.email} (ID: ${data?.id})`);
      }
    } catch (error) {
      console.error(`❌ Error procesando ${recipient.email}:`, error);
    }

    // Pequeña pausa entre emails
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✨ Proceso completado!');
}

sendEmails();
