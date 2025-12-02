'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from './AulaHeader.module.css';

export default function AulaHeader() {
  const { data: session } = useSession();

  return (
    <header className={styles.wrapper}>
      <div className={styles.navbar}>
        <Link href="/aula" className={styles.logo}>
          <span className={styles.logoIcon}>🐓</span>
          <div>
            <p className={styles.logoKicker}>Gallo Trader</p>
            <p className={styles.logoTitle}>Aula Premium</p>
          </div>
        </Link>

        <div className={styles.linkGroup}>
          {[
            { href: '/#programa', label: 'Programa' },
            { href: '/#mentoria', label: 'Mentoría' },
            { href: '/#precios', label: 'Precios' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={styles.linkPill}>
              <span className={styles.dot}></span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.userBlock}>
            <span className={styles.userName}>{session?.user?.name || 'Alumno'}</span>
            <span className={styles.userEmail}>{session?.user?.email}</span>
          </div>
          <Link href="/">
            <button className={styles.secondary}>Marketing</button>
          </Link>
          <button className={styles.primary} onClick={() => signOut({ callbackUrl: '/' })}>
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
