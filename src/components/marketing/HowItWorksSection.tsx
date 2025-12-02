import Section from '@/components/ui/Section';
import styles from './HowItWorksSection.module.css';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Aprende',
      description: 'Accede a módulos en video con la estrategia matemática completa. Participa en sesiones en vivo donde resolvemos dudas y analizamos el mercado en tiempo real.',
      icon: '📚',
    },
    {
      number: '2',
      title: 'Practica',
      description: 'Aplica lo aprendido en cuentas demo. Te enseñamos a gestionar múltiples posiciones, calcular riesgo y mantener la disciplina emocional necesaria para ser rentable.',
      icon: '💪',
    },
    {
      number: '3',
      title: 'Opera con Confianza',
      description: 'Implementa el sistema con capital real. Aprende a escalar, gestionar drawdowns y construir una fuente de ingresos consistente mes a mes.',
      icon: '🎯',
    },
  ];

  return (
    <Section background="white" className={styles.section} id="mentoria">
      <div className={styles.header}>
        <h2 className={styles.title}>
          Cómo Funciona el Programa
        </h2>
        <p className={styles.subtitle}>
          Un camino claro de 4 meses hacia la rentabilidad consistente
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step) => (
          <div key={step.number} className={styles.step}>
            <div className={styles.stepNumber}>
              {step.number}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaBanner}>
        <div className={styles.ctaHalo} />
        <div className={styles.ctaGrid}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaKicker}>¿Listo para empezar?</p>
            <h3 className={styles.ctaTitle}>Convierte disciplina en libertad financiera</h3>
            <p className={styles.ctaSubtitle}>
              No necesitas experiencia previa. Solo compromiso, guía correcta y un plan que puedas seguir semana a semana.
            </p>
            <div className={styles.ctaPills}>
              <span>Sesiones en vivo cada semana</span>
              <span>Feedback de operaciones</span>
              <span>Acceso de por vida al material</span>
            </div>
            <div className={styles.ctaActions}>
              <a href="/#precios" className={styles.primaryCta}>Empezar ahora</a>
              <a href="/#programa" className={styles.secondaryCta}>Ver programa completo</a>
            </div>
          </div>

          <div className={styles.ctaCard}>
            <div className={styles.ctaBadge}>Cohorte activa</div>
            <div className={styles.ctaStats}>
              <div>
                <p className={styles.statLabel}>Duración</p>
                <p className={styles.statValue}>4 meses</p>
              </div>
              <div>
                <p className={styles.statLabel}>Mentorías</p>
                <p className={styles.statValue}>16 sesiones</p>
              </div>
              <div>
                <p className={styles.statLabel}>Acceso</p>
                <p className={styles.statValue}>De por vida</p>
              </div>
            </div>
            <ul className={styles.ctaChecklist}>
              <li>✅ Ruta clara semana a semana</li>
              <li>✅ Acompañamiento de traders activos</li>
              <li>✅ Plan de riesgo para operar con confianza</li>
            </ul>
            <div className={styles.ctaFoot}>
              <div>
                <p className={styles.ctaHighlight}>Quedan 7 de 25 lugares</p>
                <p className={styles.ctaNote}>Cierre de inscripciones este mes</p>
              </div>
              <a href="/login" className={styles.textLink}>Hablar con el equipo →</a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
