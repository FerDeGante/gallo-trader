'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { href: '#programa', label: 'Programa' },
    { href: '#mentoria', label: 'Mentoría' },
    { href: '#precios', label: 'Precios' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🐓</span>
          <span>Gallo Trader</span>
        </Link>

        <div className={`${styles.navLinks} hidden md:flex`}>
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className={`${styles.link} ${styles.linkPill}`}>
              <span className={styles.linkDot} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          {status === 'loading' ? (
            <div className="w-24 h-10 bg-white/10 animate-pulse rounded-full"></div>
          ) : session ? (
            <>
              <Link href="/aula" className={styles.loginBtn}>
                Mi Aula
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className={styles.loginBtn}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>
                Entrar
              </Link>
              <Link href="/#precios" className={styles.ctaBtn}>
                Empezar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
