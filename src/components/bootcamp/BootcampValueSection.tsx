'use client';

import styles from './BootcampValueSection.module.css';

export default function BootcampValueSection() {
  const benefits = [
    {
      icon: '🎯',
      title: 'Estrategia Lista para Usar',
      description: 'El mismo sistema que Gallo usa para pasar cuentas fondeadas consistentemente',
    },
    {
      icon: '⚡',
      title: 'Resultados en 7 Días',
      description: 'Programa intensivo diseñado para que pases tu evaluación rápidamente',
    },
    {
      icon: '💎',
      title: 'Mentoría Directa',
      description: 'Sesiones en vivo diarias con Gallo para resolver todas tus dudas',
    },
    {
      icon: '📊',
      title: 'Plan de Trading Completo',
      description: 'Desde la psicología hasta la ejecución, todo lo que necesitas saber',
    },
    {
      icon: '🎓',
      title: 'Comunidad Premium',
      description: 'Acceso exclusivo al grupo de Discord con traders que están pasando cuentas',
    },
    {
      icon: '🔥',
      title: 'Soporte Continuo',
      description: 'Acompañamiento directo hasta que pases tu cuenta fondeada',
    },
  ];

  return (
    <section className={styles.section} id="valor">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Por Qué Este Bootcamp</span>
          <h2 className={styles.title}>
            Todo lo que necesitas para <span className={styles.highlight}>conseguir tu cuenta fondeada</span>
          </h2>
          <p className={styles.subtitle}>
            No más teoría sin resultados. Solo lo que funciona en el mercado real.
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{benefit.icon}</span>
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
