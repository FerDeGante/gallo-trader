'use client';

import { useState, useEffect, useRef } from 'react';
import Section from '@/components/ui/Section';
import styles from './WhatWeAreNotSection.module.css';

export default function WhatWeAreNotSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const points = [
    {
      id: 0,
      emoji: '🚫',
      title: 'No prometemos hacerte rico en 30 días',
      description: 'El trading requiere tiempo, práctica y disciplina. Quien te diga lo contrario te está mintiendo.',
      image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 1,
      emoji: '🤖',
      title: 'No somos señales ni robots mágicos',
      description: 'Te enseñamos a pensar como trader profesional, no a copiar señales ciegamente. Aprenderás a pescar, no te daremos pescado.',
      image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 2,
      emoji: '⚡️',
      title: 'No es para personas que buscan atajos',
      description: 'Si buscas dinero rápido sin esfuerzo, este programa no es para ti. Exige dedicación y compromiso real.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 3,
      emoji: '📉',
      title: 'No garantizamos ganancias específicas',
      description: 'Somos un programa educativo, no asesoría de inversión. Los resultados dependen de tu aplicación y disciplina.',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % points.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isInView, points.length]);

  useEffect(() => {
    // Solo hacer scroll interno si la sección ya está visible
    if (!isInView) return;
    
    const container = contentRef.current;
    if (!container) return;

    const activeItem = container.querySelector<HTMLElement>(`[data-step="${activeStep}"]`);
    activeItem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeStep, isInView]);

  return (
    <div className={styles.outerSection} ref={sectionRef}>
      <div className={styles.stickyWrapper}>
        <Section background="dark" className={styles.innerSection}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2 className={styles.title}>Gestión de Expectativas</h2>
              <p className={styles.subtitle}>
                Honestidad ante todo: Esto es lo que <span className="text-red-500 font-bold">NO</span> prometemos
              </p>
            </div>

            <div className={styles.splitLayout}>
              {/* Left Side - Image */}
              <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  {points.map((point, index) => (
                    <div 
                      key={point.id}
                      className={`${styles.imageSlide} ${activeStep === index ? styles.activeImage : ''}`}
                      style={{ backgroundImage: `url(${point.image})` }}
                    />
                  ))}
                  <div className={styles.imageOverlay} />
                  <div className={styles.activeTextOverlay}>
                    <span className={styles.overlayEmoji}>{points[activeStep].emoji}</span>
                    <h3 className={styles.overlayTitle}>{points[activeStep].title}</h3>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className={styles.contentContainer}>
                <div className={styles.progressBarContainer}>
                  <div 
                    className={styles.progressBarFill} 
                    style={{ height: `${((activeStep + 1) / points.length) * 100}%` }}
                  />
                </div>
                
                <div className={styles.itemsViewport} ref={contentRef}>
                  {points.map((point, index) => (
                    <div 
                      key={point.id} 
                      className={`${styles.item} ${activeStep === index ? styles.activeItem : ''}`}
                      data-step={index}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className={styles.itemContent}>
                        <h3 className={styles.itemTitle}>{point.title}</h3>
                        <p className={styles.itemDescription}>{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
