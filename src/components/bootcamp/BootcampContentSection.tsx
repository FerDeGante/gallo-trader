'use client';

import styles from './BootcampContentSection.module.css';

export default function BootcampContentSection() {
  const modules = [
    {
      module: 'MÓDULO A',
      title: 'Todo lo que tienen que saber antes del fondeo',
      subtitle: 'Análisis / Mentalidad / 2 semanas',
    },
    {
      module: 'MÓDULO B',
      title: 'Todo lo que deben de saber durante',
      subtitle: 'Cuentas / 1 semana',
    },
    {
      module: 'MÓDULO C',
      title: 'Todo lo que deben de saber después de fondearse',
      subtitle: 'Activación / Replicador',
    },
  ];

  return (
    <section className={styles.section} id="programa">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Módulos Integrales</span>
          <h2 className={styles.title}>
            Contenido completo del <span className={styles.highlight}>Master Funding Bootcamp</span>
          </h2>
          <p className={styles.subtitle}>
            Tres módulos diseñados para llevarte desde cero hasta conseguir tu cuenta fondeada con todo el conocimiento y herramientas necesarias.
          </p>
        </div>

        <div className={styles.modulesGrid}>
          {modules.map((item, index) => (
            <div key={index} className={styles.moduleCard}>
              <div className={styles.moduleHeader}>
                <div className={styles.moduleLetter}>{String.fromCharCode(65 + index)}</div>
              </div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>{item.title}</h3>
                <p className={styles.moduleSubtitle}>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
