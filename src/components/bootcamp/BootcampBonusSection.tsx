'use client';

import styles from './BootcampBonusSection.module.css';

export default function BootcampBonusSection() {
  const bonuses = [
    {
      icon: '🎁',
      title: 'Templates de Trading',
      value: '$297',
      description: 'Plantillas pre-configuradas para TradingView con los setups exactos de Gallo',
    },
    {
      icon: '📱',
      title: 'Acceso a Discord VIP',
      value: '$497',
      description: 'Grupo exclusivo con traders activos pasando cuentas fondeadas',
    },
    {
      icon: '🎯',
      title: 'Checklist de Evaluación',
      value: '$197',
      description: 'Sistema paso a paso para pasar cualquier challenge de prop firm',
    },
    {
      icon: '📊',
      title: 'Dashboard de Seguimiento',
      value: '$397',
      description: 'Herramienta para trackear tu progreso y estadísticas de trading',
    },
  ];

  const totalValue = bonuses.reduce((sum, bonus) => {
    const value = parseInt(bonus.value.replace('$', ''));
    return sum + value;
  }, 0);

  return (
    <section className={styles.section} id="bonos">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Bonos Incluidos</span>
          <h2 className={styles.title}>
            Recibe más de <span className={styles.highlight}>${totalValue} en bonos</span> al inscribirte hoy
          </h2>
          <p className={styles.subtitle}>
            Herramientas y recursos que te darán ventaja competitiva desde el día 1
          </p>
        </div>

        <div className={styles.bonusGrid}>
          {bonuses.map((bonus, index) => (
            <div key={index} className={styles.bonusCard}>
              <div className={styles.bonusHeader}>
                <span className={styles.bonusIcon}>{bonus.icon}</span>
                <span className={styles.bonusValue}>{bonus.value}</span>
              </div>
              <h3 className={styles.bonusTitle}>{bonus.title}</h3>
              <p className={styles.bonusDescription}>{bonus.description}</p>
              <div className={styles.bonusBadge}>GRATIS</div>
            </div>
          ))}
        </div>

        <div className={styles.valueBox}>
          <div className={styles.valueRow}>
            <span className={styles.valueLabel}>Valor Total del Bootcamp + Bonos:</span>
            <span className={styles.valueAmount}>${1000 + totalValue}</span>
          </div>
          <div className={styles.valueDivider}></div>
          <div className={styles.valueRow}>
            <span className={styles.valueLabel}>Tu inversión hoy:</span>
            <span className={styles.valuePrice}>$1,000</span>
          </div>
          <div className={styles.savings}>
            Ahorras ${totalValue} • Solo por tiempo limitado
          </div>
        </div>
      </div>
    </section>
  );
}
