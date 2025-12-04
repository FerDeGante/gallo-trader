'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import styles from './BootcampHeroSection.module.css';

export default function BootcampHeroSection() {
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
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gridBackground}></div>
        <div className={`${styles.gradientBlob} ${styles.blob1}`}></div>
        <div className={`${styles.gradientBlob} ${styles.blob2}`}></div>
        <div className={`${styles.gradientBlob} ${styles.blob3}`}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          🔥 Cupos Limitados - Inicia en 7 días
        </div>

        <h1 className={styles.title}>
          Master Funding<br />
          <span className={styles.gradientText}>
            Bootcamp
          </span>
        </h1>
        
        <p className={styles.subtitle}>
          Tu primera cuenta fondeada de $100K en tiempo récord
          <br className="hidden md:block" />
          7 días intensivos • Estrategia probada • Acompañamiento directo
        </p>

        <div className={styles.priceBox}>
          <div className={styles.priceLabel}>Inversión del Bootcamp</div>
          <div className={styles.priceValue}>
            <span className={styles.currency}>$</span>1,000
            <span className={styles.pricePeriod}>USD</span>
          </div>
          <div className={styles.priceNote}>Pago único • Acceso inmediato</div>
        </div>

        <div className={styles.ctaGroup}>
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleCheckout}
            isLoading={isLoading}
            className={styles.mainCta}
          >
            🚀 Asegurar mi Cupo Ahora - $1,000
          </Button>
          <div className={styles.ctaNote}>
            <span className={styles.checkIcon}>✓</span>
            Pago seguro con Stripe • Acceso inmediato al Discord
          </div>
        </div>

        <div className={styles.statsGrid}>
          {[
            { icon: '⚡', text: '7 días intensivos', sub: 'Resultados rápidos' },
            { icon: '💰', text: 'Cuenta $100K', sub: 'Tu primera prop firm' },
            { icon: '🎯', text: 'Estrategia probada', sub: 'Sistema de Gallo' }
          ].map((item, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{item.icon}</div>
              <div className={styles.statInfo}>
                <div className={styles.statTitle}>{item.text}</div>
                <div className={styles.statSub}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.urgencyBanner}>
          <span className={styles.urgencyIcon}>⏰</span>
          <span className={styles.urgencyText}>
            Solo <strong>15 cupos disponibles</strong> para mantener la calidad del acompañamiento
          </span>
        </div>
      </div>
    </section>
  );
}
