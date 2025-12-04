'use client';

import styles from './BootcampContentSection.module.css';

export default function BootcampContentSection() {
  const days = [
    {
      day: 'Día 1',
      title: 'Fundamentos y Mentalidad',
      topics: [
        'Psicología del trader profesional',
        'Gestión de riesgo en prop firms',
        'Configuración del entorno de trading',
        'Análisis de las reglas de evaluación',
      ],
    },
    {
      day: 'Día 2',
      title: 'Estrategia Core',
      topics: [
        'El sistema de Gallo paso a paso',
        'Identificación de setups de alta probabilidad',
        'Timeframes y sincronización',
        'Práctica en simulador',
      ],
    },
    {
      day: 'Día 3',
      title: 'Ejecución Perfecta',
      topics: [
        'Entrada, stop loss y take profit',
        'Trailing stop y gestión de operaciones',
        'Errores comunes y cómo evitarlos',
        'Sesión de trading en vivo',
      ],
    },
    {
      day: 'Día 4',
      title: 'Plan de Trading',
      topics: [
        'Creación de tu plan personalizado',
        'Diario de trading y análisis',
        'Horarios óptimos para operar',
        'Revisión de operaciones del grupo',
      ],
    },
    {
      day: 'Día 5',
      title: 'Práctica Intensiva',
      topics: [
        'Trading en simulador supervisado',
        'Feedback personalizado de Gallo',
        'Refinamiento de la estrategia',
        'Preparación psicológica',
      ],
    },
    {
      day: 'Día 6',
      title: 'Challenge Day',
      topics: [
        'Inicio de tu evaluación real',
        'Soporte en tiempo real',
        'Análisis de cada operación',
        'Ajustes según el mercado',
      ],
    },
    {
      day: 'Día 7',
      title: 'Revisión y Siguientes Pasos',
      topics: [
        'Análisis completo de tu semana',
        'Plan de continuación',
        'Acceso a comunidad premium',
        'Soporte post-bootcamp',
      ],
    },
  ];

  return (
    <section className={styles.section} id="programa">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Programa Intensivo</span>
          <h2 className={styles.title}>
            7 días que cambiarán tu <span className={styles.highlight}>carrera de trading</span>
          </h2>
          <p className={styles.subtitle}>
            Cada día está diseñado para construir sobre el anterior, llevándote desde cero hasta estar listo para tu cuenta fondeada.
          </p>
        </div>

        <div className={styles.timeline}>
          {days.map((item, index) => (
            <div key={index} className={styles.dayCard}>
              <div className={styles.dayNumber}>{item.day}</div>
              <div className={styles.dayContent}>
                <h3 className={styles.dayTitle}>{item.title}</h3>
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
      </div>
    </section>
  );
}
