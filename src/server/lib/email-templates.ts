import Stripe from 'stripe';

/**
 * Template de email de bienvenida al bootcamp
 */
export function getBootcampWelcomeEmailTemplate(
  email: string,
  session: Stripe.Checkout.Session
): string {
  const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '1000.00';
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido al Master Funding Bootcamp</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #000000; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 40px;">
              <h1 style="margin: 0; font-size: 48px; font-weight: 800; color: #ffffff;">
                🎉 ¡Bienvenido!
              </h1>
            </td>
          </tr>
          
          <!-- Success Badge -->
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <div style="display: inline-block; background: linear-gradient(135deg, #34a853 0%, #2d8e44 100%); width: 80px; height: 80px; border-radius: 50%; line-height: 80px; font-size: 40px;">
                ✓
              </div>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="text-align: center; padding-bottom: 20px;">
              <h2 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff;">
                Master Funding Bootcamp
              </h2>
            </td>
          </tr>
          
          <!-- Subtitle -->
          <tr>
            <td style="text-align: center; padding-bottom: 40px;">
              <p style="margin: 0; font-size: 18px; color: #94a3b8; line-height: 1.6;">
                Tu inscripción ha sido confirmada. Estás a punto de comenzar tu camino hacia tu primera cuenta fondeada.
              </p>
            </td>
          </tr>
          
          <!-- Payment Info Card -->
          <tr>
            <td style="padding-bottom: 40px;">
              <table width="100%" cellpadding="20" cellspacing="0" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">
                      Pago Confirmado
                    </p>
                    <p style="margin: 0; font-size: 36px; font-weight: 900; color: #34a853;">
                      $${amount} USD
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Discord CTA -->
          <tr>
            <td style="padding-bottom: 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(66, 133, 244, 0.1)); border: 2px solid rgba(88, 101, 242, 0.3); border-radius: 16px;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700; color: #ffffff;">
                      🎮 Únete al Discord VIP
                    </p>
                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #94a3b8;">
                      Conecta con otros participantes y comienza a prepararte
                    </p>
                    <a href="https://discord.gg/YFrN3mDk" style="display: inline-block; background: #5865f2; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700; padding: 16px 40px; border-radius: 12px;">
                      Unirme a Discord
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Next Steps -->
          <tr>
            <td style="padding-bottom: 40px;">
              <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #ffffff; text-align: center;">
                Próximos pasos:
              </h3>
              
              <!-- Step 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #34a853, #2d8e44); border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px; font-weight: 800;">
                      1
                    </div>
                  </td>
                  <td style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 15px;">
                    <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 700; color: #ffffff;">
                      Únete a Discord
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                      Preséntate y conoce a tus compañeros de bootcamp
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Step 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #34a853, #2d8e44); border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px; font-weight: 800;">
                      2
                    </div>
                  </td>
                  <td style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 15px;">
                    <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 700; color: #ffffff;">
                      Configura tu setup
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                      Prepara TradingView y tu entorno de trabajo
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Step 3 -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width: 50px; vertical-align: top; padding-right: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #34a853, #2d8e44); border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px; font-weight: 800;">
                      3
                    </div>
                  </td>
                  <td style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 15px;">
                    <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: 700; color: #ffffff;">
                      Prepárate mentalmente
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                      Los próximos 7 días serán intensivos y transformadores
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What's Included -->
          <tr>
            <td style="padding-bottom: 40px;">
              <table width="100%" cellpadding="20" cellspacing="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                      Lo que incluye tu bootcamp:
                    </h3>
                    <ul style="margin: 0; padding: 0; list-style: none;">
                      <li style="margin-bottom: 12px; padding-left: 30px; position: relative; color: #e2e8f0; font-size: 15px;">
                        <span style="position: absolute; left: 0; color: #34a853; font-weight: 700;">✓</span>
                        7 sesiones en vivo con Gallo
                      </li>
                      <li style="margin-bottom: 12px; padding-left: 30px; position: relative; color: #e2e8f0; font-size: 15px;">
                        <span style="position: absolute; left: 0; color: #34a853; font-weight: 700;">✓</span>
                        Estrategia completa paso a paso
                      </li>
                      <li style="margin-bottom: 12px; padding-left: 30px; position: relative; color: #e2e8f0; font-size: 15px;">
                        <span style="position: absolute; left: 0; color: #34a853; font-weight: 700;">✓</span>
                        Acceso a Discord VIP de por vida
                      </li>
                      <li style="margin-bottom: 12px; padding-left: 30px; position: relative; color: #e2e8f0; font-size: 15px;">
                        <span style="position: absolute; left: 0; color: #34a853; font-weight: 700;">✓</span>
                        Templates y herramientas de trading
                      </li>
                      <li style="margin-bottom: 12px; padding-left: 30px; position: relative; color: #e2e8f0; font-size: 15px;">
                        <span style="position: absolute; left: 0; color: #34a853; font-weight: 700;">✓</span>
                        Soporte hasta que pases tu cuenta
                      </li>
                      <li style="padding-left: 30px; position: relative; color: #e2e8f0; font-size: 15px;">
                        <span style="position: absolute; left: 0; color: #34a853; font-weight: 700;">✓</span>
                        Bonos valorados en $1,388
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="text-align: center; padding-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
              <p style="margin: 0 0 10px 0; font-size: 16px; color: #cbd5e1;">
                ¿Tienes preguntas? Escríbenos en Discord
              </p>
              <p style="margin: 0; font-size: 18px; font-weight: 700; background: linear-gradient(135deg, #34a853, #4285f4); -webkit-background-clip: text; background-clip: text; color: transparent;">
                Nos vemos en el bootcamp 🚀
              </p>
            </td>
          </tr>
          
          <!-- Spacer -->
          <tr>
            <td style="height: 40px;"></td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Template de texto plano (fallback)
 */
export function getBootcampWelcomeEmailText(
  email: string,
  session: Stripe.Checkout.Session
): string {
  const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '1000.00';
  
  return `
¡Bienvenido al Master Funding Bootcamp! 🎉

Tu inscripción ha sido confirmada.

Pago confirmado: $${amount} USD

ÚNETE AL DISCORD VIP:
https://discord.gg/YFrN3mDk

PRÓXIMOS PASOS:

1. Únete a Discord
   Preséntate y conoce a tus compañeros de bootcamp

2. Configura tu setup
   Prepara TradingView y tu entorno de trabajo

3. Prepárate mentalmente
   Los próximos 7 días serán intensivos y transformadores

LO QUE INCLUYE:
✓ 7 sesiones en vivo con Gallo
✓ Estrategia completa paso a paso
✓ Acceso a Discord VIP de por vida
✓ Templates y herramientas de trading
✓ Soporte hasta que pases tu cuenta
✓ Bonos valorados en $1,388

¿Tienes preguntas? Escríbenos en Discord

Nos vemos en el bootcamp 🚀

---
Gallo Trader
  `.trim();
}
