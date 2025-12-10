'use client';

import styles from './BootcampVideoSection.module.css';

export default function BootcampVideoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>🎥 Video de Presentación</span>
          <h2 className={styles.title}>
            ¿Te imaginas <span className={styles.highlight}>fondearte con $50K MXN las próximas semanas?</span>
          </h2>
          <p className={styles.subtitle}>
            Eso es lo que obtendrás con el bootcamp y acompañamiento de traders que ya han recorrido el camino que quieres recorrer, con una estrategia sencilla y paso a paso
          </p>
        </div>

        <div className={styles.videoWrapper}>
          <div className={styles.videoContainer}>
            <iframe
              className={styles.video}
              src="https://www.youtube.com/embed/vIgw3dzQyOw"
              title="Master Funding Bootcamp"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Sistema Matemático</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>7 días</div>
            <div className={styles.statLabel}>Programa Intensivo</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>$50K</div>
            <div className={styles.statLabel}>Tu Primera Cuenta</div>
          </div>
        </div>
      </div>
    </section>
  );
}
