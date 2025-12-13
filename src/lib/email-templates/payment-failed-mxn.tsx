import * as React from 'react';

interface PaymentFailedMXNEmailProps {
  nombre: string;
  checkoutUrl: string;
  codigoDescuento: string;
}

export const PaymentFailedMXNEmail = ({
  nombre,
  checkoutUrl,
  codigoDescuento,
}: PaymentFailedMXNEmailProps) => (
  <html>
    <head>
      <style>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: linear-gradient(180deg, #1a2347 0%, #202c56 100%);
            border-radius: 16px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #ac965a 0%, #d4c896 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            color: #202c56;
            font-size: 28px;
            font-weight: 800;
          }
          .content {
            padding: 40px 30px;
            color: #ffffff;
          }
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #d4c896;
          }
          .message {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 20px;
          }
          .highlight-box {
            background: rgba(172, 150, 90, 0.15);
            border: 2px solid rgba(172, 150, 90, 0.4);
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
          }
          .highlight-box p {
            margin: 0 0 15px 0;
            font-size: 16px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #ac965a 0%, #d4c896 100%);
            color: #202c56 !important;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 18px;
            margin: 20px 0;
            text-align: center;
          }
          .code {
            background: rgba(255, 255, 255, 0.1);
            border: 2px dashed #ac965a;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #d4c896;
            display: inline-block;
            margin: 15px 0;
          }
          .support {
            background: rgba(255, 255, 255, 0.05);
            border-left: 4px solid #ac965a;
            padding: 20px;
            margin: 30px 0;
            border-radius: 8px;
          }
          .footer {
            text-align: center;
            padding: 30px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }
          .emoji {
            font-size: 24px;
            margin-right: 8px;
          }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🎯 Master Funding Bootcamp</h1>
        </div>
        
        <div className="content">
          <p className="greeting">Hola, {nombre}. 👋</p>
          
          <p className="message">
            Vi que intentaste inscribirte al <strong>Master Funding Bootcamp</strong> pero tu tarjeta no pasó porque estaba configurado en USD.
          </p>
          
          <p className="message">
            <strong>¡Buenas noticias!</strong> 🎉 Ya lo habilitamos en <strong>pesos mexicanos (MXN)</strong>, para que puedas completar tu inscripción sin ese bloqueo.
          </p>

          <div className="highlight-box">
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              <span className="emoji">✨</span> Completa tu inscripción ahora
            </p>
            
            <a href={checkoutUrl} className="cta-button">
              🚀 INSCRIBIRME AHORA
            </a>
            
            <p style={{ marginTop: '25px', fontSize: '16px' }}>
              <strong>No olvides usar tu código de descuento:</strong>
            </p>
            <div className="code">{codigoDescuento}</div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '15px' }}>
              Ingrésalo en el checkout de Stripe para obtener tu descuento especial
            </p>
          </div>

          <div className="support">
            <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
              <strong>💬 ¿Sigue sin funcionar?</strong>
            </p>
            <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.6' }}>
              Responde este correo con una captura del error y el nombre de tu banco. Te ayudaré a resolverlo de inmediato.
            </p>
          </div>

          <p className="message" style={{ marginTop: '30px' }}>
            Nos vemos adentro del bootcamp,
          </p>
          <p className="message" style={{ fontWeight: '600', color: '#d4c896' }}>
            — Equipo Master Funding Bootcamp
          </p>
        </div>

        <div className="footer">
          <p>Master Funding Bootcamp by Gallo Trader</p>
          <p>www.mfb.mx</p>
          
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <a href="https://x.com/jlcastillovar" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://instagram.com/gallo_trader/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://youtube.com/@gallotrader77" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </body>
  </html>
);
