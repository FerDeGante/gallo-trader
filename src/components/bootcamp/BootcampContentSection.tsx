'use client';

import styles from './BootcampContentSection.module.css';

export default function BootcampContentSection() {
  const modules = [
    {
      module: 'MÓDULO A',
      title: 'Todo lo que tienen que saber antes del fondeo',
      subtitle: '(Análisis / Mentalidad / 2 semanas)',
      topics: [
        'Introducción al fondeo rápido',
        'La mentalidad del trader exitoso',
        '¿Por qué el modelo funciona?',
        '¿Qué es una empresa de fondeo?',
        'Diferencia entre CFDs vs Futuros',
        'Qué NO debes hacer',
        'La data dice que lo conseguirás',
        'Descargable de data de estrategia de medias móviles y estocástico con confirmación',
        'La estrategia técnica, paso a paso',
        'Práctica una semana en demo',
        'Cómo crear tu cuenta demo en Ninja Trader',
        'Cómo configurar desde cero EMA\'s y estocástico en NinjaTrader',
        'Cómo usar la tabla de riesgo para calcular el tamaño de tu posición',
        'Herramienta para calcular la posición de forma automática',
        'Como instalar Axelia Risk',
      ],
      color: '#86efac', // Verde claro
    },
    {
      module: 'MÓDULO B',
      title: 'Todo lo que deben de saber durante',
      subtitle: '(Cuentas / 1 semana)',
      topics: [
        'Como comprar mis cuentas de fondeo',
        'Como administrar mis cuentas de fondeo',
        'Descargable Bitácora',
        'Como gestionar mi riesgo por trade',
        'Descargable de herramienta de tamaño de posición',
        'Descargable de calculo de tamaño de posición mediante Excel',
        'Como colocar SL y TP en NinjaTrader',
      ],
      color: '#fde047', // Amarillo
    },
    {
      module: 'MÓDULO C',
      title: 'Todo lo que deben de saber después de fondearse',
      subtitle: '(Activación / Replicador)',
      topics: [
        'Manual como activar una cuenta fondeada',
        '¿Quemaste una cuenta de fondeo en Apex?',
        'Como usar un replicador de cuentas',
      ],
      color: '#93c5fd', // Azul claro
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

        <div className={styles.timeline}>
          {modules.map((item, index) => (
            <div key={index} className={styles.dayCard}>
              <div className={styles.dayNumber}>{item.module}</div>
              <div className={styles.dayContent}>
                <h3 className={styles.dayTitle}>{item.title}</h3>
                <p className={styles.daySubtitle}>{item.subtitle}</p>
                <ul className={styles.topicsList}>
                  {item.topics.map((topic, i) => (
                    <li key={i} className={styles.topic}>
                      <span className={styles.checkIcon}>✓</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.discordSection}>
          <div className={styles.discordIcon}>💬</div>
          <h3 className={styles.discordTitle}>Acceso a Discord Exclusivo</h3>
          <p className={styles.discordText}>
            Únete a nuestra comunidad de traders activos, comparte experiencias y recibe soporte directo durante tu proceso de fondeo.
          </p>
        </div>
      </div>
    </section>
  );
}
