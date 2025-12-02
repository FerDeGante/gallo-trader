import Section from '@/components/ui/Section';
import styles from './ValuePropositionSection.module.css';

export default function ValuePropositionSection() {
  const benefits = [
    {
      icon: '📊',
      title: 'Estrategia Matemática',
      description: 'Sistema cuantitativo basado en probabilidades y gestión de riesgo calculada, no en intuición o emociones.',
    },
    {
      icon: '🎓',
      title: 'Formación Estructurada',
      description: '4 meses de programa intensivo con módulos progresivos, desde fundamentos hasta operativa avanzada.',
    },
    {
      icon: '👥',
      title: 'Comunidad Activa',
      description: 'Acceso a grupo privado de traders donde compartimos análisis, resolvemos dudas y nos mantenemos disciplinados.',
    },
    {
      icon: '🎯',
      title: 'Mentoría en Vivo',
      description: 'Sesiones semanales de análisis de mercado en tiempo real y revisión de operaciones con feedback directo.',
    },
    {
      icon: '♾️',
      title: 'Acceso de Por Vida',
      description: 'Después de los 4 meses activos, mantienes acceso permanente a todo el contenido y actualizaciones futuras.',
    },
    {
      icon: '⚡',
      title: 'Soporte Continuo',
      description: 'Resolución de dudas por chat privado y actualizaciones constantes del material según evoluciona el mercado.',
    },
  ];

  return (
    <Section background="dark" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Por Qué Este Programa Es Diferente
        </h2>
        <p className={styles.subtitle}>
          No es otro curso en video. Es un sistema completo de formación 
          con acompañamiento real y resultados medibles.
        </p>
      </div>

      <div className={styles.grid}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardIcon}>{benefit.icon}</div>
            <h3 className={styles.cardTitle}>{benefit.title}</h3>
            <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center relative z-10">
        <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            📈 Objetivo del Programa
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Que domines una estrategia rentable y replicable, que entiendas la gestión de riesgo 
            a nivel profesional, y que puedas operar con confianza y disciplina para generar 
            ingresos consistentes mes a mes. No garantizamos cifras específicas, pero te damos 
            las herramientas que usan traders institucionales.
          </p>
        </div>
      </div>
    </Section>
  );
}
