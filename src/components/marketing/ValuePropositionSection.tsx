'use client';

import { useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import styles from './ValuePropositionSection.module.css';

export default function ValuePropositionSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const benefits = [
    {
      icon: '📊',
      title: 'Estrategia Matemática',
      description: 'Sistema cuantitativo basado en probabilidades y gestión de riesgo calculada, no en intuición o emociones.',
    },
    {
      icon: '🎓',
      title: 'Formación Estructurada',
      description: '4 meses de programa intensivo con módulos progresivos, desde fundamentos hasta operativa avanzada.',
    },
    {
      icon: '👥',
      title: 'Comunidad Activa',
      description: 'Acceso a grupo privado de traders donde compartimos análisis, resolvemos dudas y nos mantenemos disciplinados.',
    },
    {
      icon: '🎯',
      title: 'Mentoría en Vivo',
      description: 'Sesiones semanales de análisis de mercado en tiempo real y revisión de operaciones con feedback directo.',
    },
    {
      icon: '♾️',
      title: 'Acceso de Por Vida',
      description: 'Después de los 4 meses activos, mantienes acceso permanente a todo el contenido y actualizaciones futuras.',
    },
    {
      icon: '⚡',
      title: 'Soporte Continuo',
      description: 'Resolución de dudas por chat privado y actualizaciones constantes del material según evoluciona el mercado.',
    },
  ];

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.2, rootMargin: '-50px' }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <Section background="dark" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Por Qué Este Programa Es Diferente
        </h2>
        <p className={styles.subtitle}>
          No es otro curso en video. Es un sistema completo de formación 
          con acompañamiento real y resultados medibles.
        </p>
      </div>

      <div className={styles.grid}>
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            ref={el => cardRefs.current[index] = el}
            className={`${styles.card} ${visibleCards.has(index) ? styles.cardVisible : ''}`}
            style={{ 
              transitionDelay: `${(index % 3) * 100}ms`
            }}
          >
            <div className={styles.cardIcon}>{benefit.icon}</div>
            <h3 className={styles.cardTitle}>{benefit.title}</h3>
            <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
