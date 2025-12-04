import type { Metadata } from 'next';
import styles from './success.module.css';

export const metadata: Metadata = {
  title: '¡Bienvenido al Bootcamp! - Gallo Trader',
  description: 'Tu inscripción ha sido confirmada',
};

export default function BootcampSuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradientBlob1}></div>
        <div className={styles.gradientBlob2}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <span className={styles.successIcon}>✓</span>
        </div>

        <h1 className={styles.title}>
          ¡Bienvenido al Master Funding Bootcamp! 🎉
        </h1>

        <p className={styles.subtitle}>
          Tu inscripción ha sido confirmada. Estás a punto de comenzar tu camino hacia tu primera cuenta fondeada.
        </p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>📧 Revisa tu correo electrónico</h2>
          <p className={styles.cardText}>
            Te hemos enviado un email de confirmación con:
          </p>
          <ul className={styles.list}>
            <li>Enlace de acceso al grupo de Discord VIP</li>
            <li>Calendario con las fechas de las sesiones en vivo</li>
            <li>Guía de preparación para el primer día</li>
            <li>Instrucciones para configurar tu entorno de trading</li>
          </ul>
        </div>

        <div className={styles.discordSection}>
          <h2 className={styles.discordTitle}>
            🎮 Únete ahora al Discord VIP
          </h2>
          <p className={styles.discordText}>
            Conecta con otros participantes del bootcamp y comienza a prepararte
          </p>
          <a 
            href="https://discord.gg/YFrN3mDk" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.discordButton}
          >
            Unirme a Discord
          </a>
        </div>

        <div className={styles.nextSteps}>
          <h3 className={styles.stepsTitle}>Próximos pasos:</h3>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Únete a Discord</h4>
                <p className={styles.stepText}>
                  Presenta yourself y conoce a tus compañeros
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Configura tu setup</h4>
                <p className={styles.stepText}>
                  Sigue la guía de preparación que recibiste por email
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Prepárate mentalmente</h4>
                <p className={styles.stepText}>
                  Los próximos 7 días serán intensivos y transformadores
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            ¿Tienes preguntas? Escríbenos en Discord o responde al email de confirmación.
          </p>
          <p className={styles.footerNote}>
            Nos vemos en el bootcamp 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
