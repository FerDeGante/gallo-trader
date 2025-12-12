'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './success.module.css';

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');

      // Si no hay session_id, redirigir
      if (!sessionId) {
        console.log('❌ No session_id found, redirecting...');
        router.push('/bootcamp');
        return;
      }

      try {
        // Verificar con el backend que el pago es válido
        const response = await fetch(`/api/v1/checkout/verify-session?session_id=${sessionId}`);
        const data = await response.json();

        console.log('📋 Verification response:', { status: response.status, data });

        // Verificar que la respuesta sea OK y tenga data (no error)
        if (!response.ok || data.error) {
          console.log('❌ Invalid session, redirecting...', data);
          router.push('/bootcamp');
          return;
        }

        // Pago verificado correctamente
        console.log('✅ Payment verified:', data.data);
        setCustomerEmail(data.data?.customer_email || null);
        setIsVerifying(false);
      } catch (error) {
        console.error('❌ Error verifying payment:', error);
        router.push('/bootcamp');
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  // Mostrar loader mientras verifica
  if (isVerifying) {
    return (
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.gradientBlob1}></div>
          <div className={styles.gradientBlob2}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Verificando tu pago...</p>
          </div>
        </div>
      </div>
    );
  }

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
          ¡Bienvenido a Master Funding Bootcamp! 🎉
        </h1>

        <p className={styles.subtitle}>
          Tu inscripción ha sido confirmada. Estás a punto de comenzar tu camino hacia tu primera cuenta fondeada.
        </p>

        <div className={styles.discordSection}>
          <h2 className={styles.discordTitle}>
            🎮 Únete ahora al Discord VIP
          </h2>
          <p className={styles.discordText}>
            Conecta con otros participantes del bootcamp, accede a los materiales exclusivos y comienza tu preparación
          </p>
          <a 
            href="https://discord.com/invite/5ArVFwMy" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.discordButton}
          >
            Unirme a Discord VIP
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
                  Preséntate y comienza a conectar con más traders
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Revisa los materiales</h4>
                <p className={styles.stepText}>
                  Ahí encontrarás toda la información, guías y recursos que usarás durante el Bootcamp
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Prepárate mentalmente</h4>
                <p className={styles.stepText}>
                  Vienen semanas intensivas, de mucho enfoque y transformación. ¡Tú puedes!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            ¿Tienes preguntas? Escríbenos por Discord; todo el equipo estaremos listos para apoyarte en lo que necesites
          </p>
          <p className={styles.footerNote}>
            ¡Nos vemos en el Bootcamp!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BootcampSuccessPage() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.gradientBlob1}></div>
          <div className={styles.gradientBlob2}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Cargando...</p>
          </div>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
