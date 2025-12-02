'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email o contraseña incorrectos');
        setIsLoading(false);
      } else {
        // Obtener la sesión actualizada para determinar el rol
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        // Redirigir según el rol del usuario
        if (session?.user?.role === 'ADMIN') {
          router.push('/admin');
        } else {
          // Para estudiantes o cualquier otro rol
          const redirect = searchParams.get('redirect') || '/aula';
          router.push(redirect);
        }
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.shell}>
      <div className={styles.modal}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Bienvenido de vuelta</p>
          <h1 className={styles.title}>Entra a tu cuenta</h1>
          <p className={styles.subtitle}>
            Accede a tu panel, mentorías y material actualizado. Mantén tu progreso y continúa con el plan semanal.
          </p>
          <div className={styles.badges}>
            <span>Soporte prioritario</span>
            <span>Sesiones en vivo</span>
            <span>Acceso de por vida</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.wizard}>
            {['Acceso', 'Pago', 'Tu aula'].map((step, idx) => (
              <div key={step} className={styles.wizardStep}>
                <div className={`${styles.wizardBullet} ${idx === 0 ? styles.activeBullet : ''}`}>{idx + 1}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardKicker}>Acceso seguro</p>
              <h2 className={styles.cardTitle}>Iniciar sesión</h2>
            </div>
            <span className={styles.lockBadge}>🔒 Pago 100% cifrado</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.error}>{error}</div>
            )}

            <label className={styles.field}>
              <span>Email</span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span>Contraseña</span>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
              />
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={styles.submit}
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </form>

          <div className={styles.footer}>
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className={styles.link}>
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
