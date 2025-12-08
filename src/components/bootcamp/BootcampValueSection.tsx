'use client';

import styles from './BootcampValueSection.module.css';

export default function BootcampValueSection() {
  const benefits = [
    {
      icon: '🎯',
      title: 'Estrategia Probada',
      description: 'Sistema completo con medias móviles y estocástico confirmado con data real',
    },
    {
      icon: '⚡',
      title: 'Módulos Integrales',
      description: 'Todo el conocimiento desde mentalidad hasta activación de cuentas fondeadas',
    },
    {
      icon: '💎',
      title: 'Herramientas Profesionales',
      description: 'Calculadoras de posición, bitácora, configuración de NinjaTrader y más',
    },
    {
      icon: '📊',
      title: 'Plan Completo de Fondeo',
      description: 'Desde la práctica en demo hasta gestionar múltiples cuentas fondeadas',
    },
    {
      icon: '🎓',
      title: 'Comunidad Discord VIP',
      description: 'Acceso exclusivo al grupo con traders activos pasando evaluaciones',
    },
    {
      icon: '🔥',
      title: 'Descargables y Manuales',
      description: 'Todo el material necesario para operar con confianza y disciplina',
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
