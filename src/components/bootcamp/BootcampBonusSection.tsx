'use client';

import styles from './BootcampBonusSection.module.css';

export default function BootcampBonusSection() {
  return (
    <section className={styles.section} id="bonos">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Master Funding Bootcamp
          </h2>
          <p className={styles.subtitle}>
            Aprende un sistema de trading comprobado
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>💰</div>
            <h3 className={styles.benefitTitle}>Fondéate con $50K USD en menos de un mes</h3>
          </div>
          
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🎯</div>
            <h3 className={styles.benefitTitle}>Estrategia con sencillos pasos mecanizados y secuenciados, probada con más de 700 trades</h3>
          </div>
          
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>📈</div>
            <h3 className={styles.benefitTitle}>Modelo exitoso basado en datos</h3>
          </div>
          
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>⚙️</div>
            <h3 className={styles.benefitTitle}>Estrategia de trading sencilla y mecanizada</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
