'use client';

import styles from './BootcampVideoSection.module.css';

export default function BootcampVideoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>🎥 Video de Presentación</span>
          <h2 className={styles.title}>
            ¿Te imaginas <span className={styles.highlight}>fondearte con $50K USD en las próximas semanas?</span>
          </h2>
          <p className={styles.subtitle}>
            Eso es justo lo que podrás lograr con nuestro Bootcamp: una estrategia sencilla, paso a paso, y el acompañamiento de traders que ya recorrieron el camino que tú estás por iniciar.
          </p>
        </div>

        <div className={styles.videoWrapper}>
          <div className={styles.videoContainer}>
            <iframe
              className={styles.video}
              src="https://www.youtube.com/embed/Yj-RaK1anmc"
              title="Master Funding Bootcamp"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Basado en data real</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>4 Meses</div>
            <div className={styles.statLabel}>Sistema paso a paso</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>$50K USD</div>
            <div className={styles.statLabel}>Tu primera cuenta</div>
          </div>
        </div>
      </div>
    </section>
  );
}
