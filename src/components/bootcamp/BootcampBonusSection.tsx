'use client';

import styles from './BootcampBonusSection.module.css';

export default function BootcampBonusSection() {
  const bonuses = [
    {
      icon: '📊',
      title: 'Descargables y Herramientas',
      value: '$600',
      description: 'Data de estrategia, calculadora de posición, bitácora de trading y más recursos descargables',
    },
    {
      icon: '💬',
      title: 'Acceso a Discord VIP',
      value: '$600',
      description: 'Grupo exclusivo con traders activos pasando cuentas fondeadas y soporte continuo',
    },
    {
      icon: '🎯',
      title: 'Configuraciones NinjaTrader',
      value: '$500',
      description: 'Setup completo de EMAs, estocástico y Axelia Risk para operar desde el día 1',
    },
    {
      icon: '📚',
      title: 'Manuales y Guías',
      value: '$400',
      description: 'Manuales de activación de cuentas, replicador y administración de fondeo',
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
            <span className={styles.valuePrice}>$2,035</span>
          </div>
          <div className={styles.savings}>
            Ahorras ${totalValue} • Solo por tiempo limitado
          </div>
        </div>
      </div>
    </section>
  );
}
