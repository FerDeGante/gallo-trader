'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import styles from './BootcampPricingSection.module.css';

export default function BootcampPricingSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/checkout/bootcamp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/bootcamp/success`,
          cancelUrl: `${window.location.origin}/bootcamp`,
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
          <span className={styles.badge}>🚀 Comienza Hoy</span>
          <h2 className={styles.title}>
            Tu entrada al mundo del trading profesional
          </h2>
          <p className={styles.subtitle}>
            Inversión única. Resultados de por vida.
          </p>
        </div>

        <div className={styles.pricingCard}>
          <div className={styles.cardHeader}>
            <div className={styles.planName}>Master Funding Bootcamp</div>
            <div className={styles.planDuration}>7 Días Intensivos</div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceValue}>
              <span className={styles.currency}>$</span>1,000
              <span className={styles.period}>USD</span>
            </div>
            <div className={styles.priceNote}>Pago único • Sin suscripciones</div>
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>7 sesiones en vivo con Gallo</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Estrategia completa paso a paso</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Acceso a Discord VIP de por vida</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Templates y herramientas incluidas</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Soporte hasta que pases tu cuenta</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Plan de trading personalizado</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Grabaciones de todas las sesiones</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Bonos valorados en $1,388</span>
            </div>
          </div>

          <Button 
            variant="primary" 
            size="lg"
            onClick={handleCheckout}
            isLoading={isLoading}
            className={styles.ctaButton}
          >
            🚀 INSCRIBIRME AL BOOTCAMP - $1,000 USD
          </Button>
          
          <div className={styles.ctaSubtext}>
            <span className={styles.checkmark}>✓</span>
            Últimos cupos disponibles • Comienza en 7 días
          </div>

          <div className={styles.guarantee}>
            <div className={styles.guaranteeIcon}>🔒</div>
            <div className={styles.guaranteeText}>
              <strong>Pago 100% Seguro</strong>
              <span>Procesado por Stripe • Protección del comprador</span>
            </div>
          </div>

          <div className={styles.urgency}>
            ⚠️ Solo quedan <strong>15 cupos</strong> disponibles
          </div>
        </div>

        <div className={styles.faq}>
          <h3 className={styles.faqTitle}>¿Tienes preguntas?</h3>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>¿Cuándo empieza?</div>
              <div className={styles.faqAnswer}>
                El próximo bootcamp inicia en 7 días. Recibirás toda la información por email al inscribirte.
              </div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>¿Necesito experiencia previa?</div>
              <div className={styles.faqAnswer}>
                No. Este bootcamp está diseñado tanto para principiantes como para traders que quieren mejorar sus resultados.
              </div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>¿Qué pasa después del bootcamp?</div>
              <div className={styles.faqAnswer}>
                Mantienes acceso al Discord VIP, a todas las grabaciones, y al soporte continuo de la comunidad.
              </div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>¿Garantizan que pasaré mi cuenta?</div>
              <div className={styles.faqAnswer}>
                Te damos todas las herramientas y el acompañamiento. El éxito depende de tu dedicación y disciplina aplicando lo aprendido.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
