'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './PricingSection.module.css';

export default function PricingSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [programId, setProgramId] = useState<string | null>(null);
  const { data: session } = useSession();

  // Obtener el ID del programa al cargar
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch('/api/v1/programs');
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setProgramId(data.data[0].id);
        }
      } catch (error) {
        console.error('Error obteniendo programa:', error);
      }
    };
    fetchProgram();
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Usar endpoint público si no hay sesión
      const endpoint = session 
        ? '/api/v1/checkout/stripe' 
        : '/api/v1/checkout/public';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: programId || 'cm4dg24t40001dw4d5gncxhib', // Fallback al ID del programa
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/`,
        }),
      });

      const data = await response.json();
      
      if (data.data?.url) {
        window.location.href = data.data.url;
      } else {
        alert(data.error || 'Error al procesar el pago');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section} id="precios">
      <div className={styles.backgroundGlow} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Oferta Limitada</span>
          <h2 className={styles.title}>
            Invierte en tu Futuro
          </h2>
          <p className={styles.subtitle}>
            Acceso completo al programa Gallo Trader con mentoría en vivo
          </p>
        </div>

        <div className={styles.pricingCard}>
          <div className={styles.cardContent}>
            <div className={styles.priceInfo}>
              <span className={styles.priceLabel}>Pago Único</span>
              <div className={styles.strikethrough}>$1,500</div>
              <div className={styles.priceValue}>$1,000</div>
              <div className={styles.pricePeriod}>USD</div>
              <p className={styles.priceDescription}>
                Oferta especial de lanzamiento. Ahorras $2,000.
                Incluye acceso de por vida a las actualizaciones.
              </p>
            </div>

            <div>
              <ul className={styles.featuresList}>
                {[
                  '4 meses de mentoría en vivo',
                  'Acceso de por vida al contenido',
                  'Comunidad privada de traders',
                  'Estrategia matemática probada',
                  'Soporte directo y personalizado',
                  'Certificado de finalización'
                ].map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={styles.ctaButton}
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : (session ? 'Inscribirme Ahora' : 'Comenzar Ahora')}
              </button>
              
              <div className={styles.guarantee}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pago 100% Seguro y Encriptado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
