'use client';

import { useEffect, useState } from 'react';
import styles from './suspended.module.css';

export default function SuspendedPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const deadline = new Date('2025-12-14T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className={styles.title}>SITIO SUSPENDIDO</h1>
        
        <div className={styles.alert}>
          <p className={styles.reason}>Incumplimiento de Contrato Acordado</p>
        </div>

        <div className={styles.contractDetails}>
          <h2 className={styles.subtitle}>CUARTA. COSTO Y FORMA DE PAGO</h2>
          <p className={styles.contractText}>
            El cliente (representante del Master Funding Bootcamp y/o Gallo Trader) se comprometió a pagar 
            una <strong>comisión del 20%</strong> de cada producto vendido.
          </p>
          <p className={styles.contractText}>
            Al haber <strong>negativa de pago</strong>, se procede a suspender el uso del dominio.
          </p>
        </div>

        <div className={styles.details}>
          <div className={styles.amountBox}>
            <span className={styles.label}>Total Adeudado:</span>
            <span className={styles.amount}>$69,842.00 MXN</span>
          </div>
        </div>

        <div className={styles.disclaimer}>
          <h3 className={styles.disclaimerTitle}>DESLINDE DE RESPONSABILIDAD</h3>
          <p className={styles.disclaimerText}>
            Se deslinda de cualquier venta, acto, situación, etc. que acontezca a partir de las 
            <strong> 15:30 hrs del 12 de diciembre de 2025</strong> con el o los representantes 
            del Master Funding Bootcamp y/o Gallo Trader.
          </p>
        </div>

        <div className={styles.countdown}>
          <p className={styles.countdownLabel}>Tiempo límite para requerimiento de pago:</p>
          <div className={styles.timer}>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{timeLeft.days}</span>
              <span className={styles.timeLabel}>Días</span>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className={styles.timeLabel}>Horas</span>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className={styles.timeLabel}>Minutos</span>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className={styles.timeLabel}>Segundos</span>
            </div>
          </div>
          <p className={styles.deadline}>14 de diciembre de 2025 • 00:00 hrs</p>
        </div>

        <div className={styles.footer}>
          <p>Este sitio permanecerá suspendido hasta que se regularice el pago pendiente.</p>
        </div>
      </div>
    </div>
  );
}
