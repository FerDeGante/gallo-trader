'use client';

import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [programId, setProgramId] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Obtener el ID del programa al cargar
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch('/api/v1/programs');
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setProgramId(data.data[0].id);
        }
      } catch (error) {
        console.error('Error obteniendo programa:', error);
      }
    };
    fetchProgram();
  }, []);

  const handleCTA = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (!programId) {
      alert('No se pudo cargar el programa. Intenta de nuevo.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/`,
        }),
      });

      const data = await response.json();
      
      if (data.data?.url) {
        window.location.href = data.data.url;
      } else {
        alert(data.error || 'Error al procesar el pago');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gridBackground}></div>
        <div className={`${styles.gradientBlob} ${styles.blob1}`}></div>
        <div className={`${styles.gradientBlob} ${styles.blob2}`}></div>
        <div className={`${styles.gradientBlob} ${styles.blob3}`}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Programa de 4 meses + acceso de por vida
        </div>

        <h1 className={styles.title}>
          Domina el Trading<br />
          <span className={styles.gradientText}>
            Construye tu Libertad
          </span>
        </h1>
        
        <p className={styles.subtitle}>
          Estrategia matemática probada • Mentoría en vivo • Comunidad activa
          <br className="hidden md:block" />
          Aprende a operar con disciplina y genera ingresos consistentes
        </p>

        <div className={styles.ctaGroup}>
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleCTA}
            isLoading={isLoading}
            className={styles.mainCta}
          >
            {session ? 'Inscribirme al Programa' : 'Acceder Ahora'}
          </Button>
          <a href="#programa">
            <Button variant="outline" size="lg" className={styles.secondaryCta}>
              Ver el programa completo
            </Button>
          </a>
        </div>

        <div className={styles.statsGrid}>
          {[
            { icon: '📊', text: 'Sistema matemático', sub: 'Probabilidad a tu favor' },
            { icon: '🎓', text: 'Mentoría 4 meses', sub: 'Acompañamiento real' },
            { icon: '👥', text: 'Comunidad activa', sub: 'Traders rentables' }
          ].map((item, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{item.icon}</div>
              <div className={styles.statInfo}>
                <div className={styles.statTitle}>{item.text}</div>
                <div className={styles.statSub}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
