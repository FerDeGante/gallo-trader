'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TestimonialVideoSection.module.css';

export default function TestimonialVideoSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isInView ? styles.visible : ''}`}>
          <div className={styles.textContent}>
            <p className={styles.kicker}>NO ES MAGIA, ES DISCIPLINA</p>
            <h2 className={styles.title}>
              De 0 a trader rentable:
              <span className={styles.highlight}> La historia real</span>
            </h2>
            <p className={styles.description}>
              Conoce el recorrido de Juan Luis Castillo, de cometer todos los errores del trader novato
              a desarrollar un sistema consistente basado en análisis y gestión de riesgo.
            </p>
            <div className={styles.highlights}>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>📊</div>
                <div>
                  <p className={styles.highlightTitle}>6 años de experiencia</p>
                  <p className={styles.highlightText}>Operando mercados reales</p>
                </div>
              </div>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>👥</div>
                <div>
                  <p className={styles.highlightTitle}>+800 alumnos</p>
                  <p className={styles.highlightText}>Formados en trading real</p>
                </div>
              </div>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>✅</div>
                <div>
                  <p className={styles.highlightTitle}>Sistema probado</p>
                  <p className={styles.highlightText}>Con resultados medibles</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.videoWrapper}>
            <div className={styles.videoContainer}>
              <iframe
                className={styles.video}
                src="https://www.youtube.com/embed/vIgw3dzQyOw?si=XNJ6vmthNcs0iOFo"
                title="Testimonios y resultados - Gallo Trader"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className={styles.videoGlow} />
            </div>
            <div className={styles.videoBadge}>
              <span className={styles.liveDot} />
              Historias reales, resultados reales
            </div>
          </div>
        </div>

        <div className={styles.statsBar}>
          {[
            { value: '95%', label: 'Tasa de satisfacción' },
            { value: '4.8/5', label: 'Rating promedio' },
            { value: '200+', label: 'Testimonios positivos' },
          ].map((stat, idx) => (
            <div key={idx} className={styles.stat}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
