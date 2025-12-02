import Section from '@/components/ui/Section';
import styles from './ForWhoSection.module.css';

export default function ForWhoSection() {
  const profiles = [
    {
      emoji: '💼',
      title: 'Quieres una nueva fuente de ingresos',
      description: 'Buscas diversificar tus entradas de dinero y no depender de un solo salario. El trading puede ser esa segunda fuente.',
    },
    {
      emoji: '🎓',
      title: 'Eres principiante pero serio',
      description: 'No sabes nada de trading pero estás dispuesto a aprender con disciplina y seguir un método probado.',
    },
    {
      emoji: '📈',
      title: 'Ya operas pero sin resultados',
      description: 'Has probado estrategias sin éxito y necesitas un sistema matemático que te dé consistencia y control de riesgo.',
    },
    {
      emoji: '🎯',
      title: 'Quieres escalar profesionalmente',
      description: 'Aspiras a conseguir cuentas fondeadas o trabajar con capital de inversores, pero necesitas formación seria.',
    },
  ];

  return (
    <Section background="dark" className={styles.section}>
      <div className={styles.glow + ' ' + styles.glow1} />
      <div className={styles.glow + ' ' + styles.glow2} />
      
      <div className={styles.header}>
        <h2 className={styles.title}>
          ¿Para quién es este programa?
        </h2>
        <p className={styles.subtitle}>
          Si te identificas con alguno de estos perfiles, este programa es para ti
        </p>
      </div>

      <div className={styles.grid}>
        {profiles.map((profile, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardIcon}>{profile.emoji}</div>
            <h3 className={styles.cardTitle}>{profile.title}</h3>
            <p className={styles.cardDescription}>{profile.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
