'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './BootcampNavBar.module.css';

export default function BootcampNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const navLinks = [
    { href: '#valor', label: 'Beneficios' },
    { href: '#programa', label: 'Programa' },
    { href: '#bonos', label: 'Por qué funciona' },
    { href: '#precios', label: 'Inscripción' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fecha de inicio: 11 de diciembre 2025 a las 19:00 (hora local)
    const targetDate = new Date('2025-12-11T19:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('precios');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/bootcamp" className={styles.logo}>
          <Image 
            src="/Logo.png" 
            alt="Master Funding Bootcamp" 
            width={180} 
            height={48}
            className={styles.logoIcon}
          />
        </Link>

        {/* Countdown Timer */}
        <div className={styles.countdown}>
          <div className={styles.countdownLabel}>
            <span className={styles.fireIcon}>🔥</span>
            <span>Inicia en</span>
          </div>
          <div className={styles.countdownTimer}>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{timeLeft.days}</span>
              <span className={styles.timeLabel}>días</span>
            </div>
            <span className={styles.timeSeparator}>:</span>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className={styles.timeLabel}>hrs</span>
            </div>
            <span className={styles.timeSeparator}>:</span>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className={styles.timeLabel}>min</span>
            </div>
            <span className={styles.timeSeparator}>:</span>
            <div className={styles.timeBlock}>
              <span className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className={styles.timeLabel}>seg</span>
            </div>
          </div>
        </div>

        <div className={`${styles.navLinks} hidden md:flex`}>
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <a href="/api/v1/checkout/bootcamp" className={styles.ctaBtn}>
            🚀 Inscribirme
          </a>
        </div>
      </div>

      {/* Floating CTA Bar - aparece al hacer scroll */}
      {scrolled && (
        <div className={styles.floatingCta}>
          <div className={styles.floatingContent}>
            {/* Countdown Timer en floating bar */}
            <div className={styles.countdown}>
              <div className={styles.countdownLabel}>
                <span className={styles.fireIcon}>🔥</span>
                <span>Inicia en</span>
              </div>
              <div className={styles.countdownTimer}>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{timeLeft.days}</span>
                  <span className={styles.timeLabel}>días</span>
                </div>
                <span className={styles.timeSeparator}>:</span>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className={styles.timeLabel}>hrs</span>
                </div>
                <span className={styles.timeSeparator}>:</span>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className={styles.timeLabel}>min</span>
                </div>
                <span className={styles.timeSeparator}>:</span>
                <div className={styles.timeBlock}>
                  <span className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className={styles.timeLabel}>seg</span>
                </div>
              </div>
            </div>

            <div className={styles.floatingText}>
              <span className={styles.floatingTitle}>Master Funding Bootcamp</span>
              <span className={styles.floatingSubtitle}>Solo 15 cupos • Acceso inmediato</span>
            </div>
            <a href="/api/v1/checkout/bootcamp" className={styles.floatingButton}>
              Asegurar mi Cupo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
