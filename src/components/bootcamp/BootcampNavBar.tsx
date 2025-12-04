'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './BootcampNavBar.module.css';

export default function BootcampNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { href: '#valor', label: 'Beneficios' },
    { href: '#programa', label: 'Programa 7 Días' },
    { href: '#bonos', label: 'Bonos' },
    { href: '#precios', label: 'Inscripción' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        <Link href="/" className={styles.logo}>
          <Image 
            src="/gallo_simbolo.png" 
            alt="Gallo" 
            width={48} 
            height={48}
            className={styles.logoIcon}
          />
          <span>Gallo Trader</span>
        </Link>

        <div className={`${styles.navLinks} hidden md:flex`}>
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <a href="#precios" onClick={scrollToCheckout} className={styles.ctaBtn}>
            🚀 Inscribirme - $1,000
          </a>
        </div>
      </div>

      {/* Floating CTA Bar - aparece al hacer scroll */}
      {scrolled && (
        <div className={styles.floatingCta}>
          <div className={styles.floatingContent}>
            <div className={styles.floatingText}>
              <span className={styles.floatingTitle}>Master Funding Bootcamp</span>
              <span className={styles.floatingSubtitle}>Solo 15 cupos • Inicia en 7 días</span>
            </div>
            <a href="#precios" onClick={scrollToCheckout} className={styles.floatingButton}>
              Asegurar mi Cupo - $1,000
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
