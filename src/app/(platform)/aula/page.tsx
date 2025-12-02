'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from './AulaPage.module.css';

interface Progress {
  lessonId: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

interface Stats {
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
}

export default function AulaPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({ totalLessons: 0, completedLessons: 0, inProgressLessons: 0 });
  const [lastLesson, setLastLesson] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      const { data } = await apiClient<{ progress: Progress[] }>('/lessons/progress/me');
      
      if (data?.progress) {
        const completed = data.progress.filter(p => p.status === 'COMPLETED').length;
        const inProgress = data.progress.filter(p => p.status === 'IN_PROGRESS').length;
        const total = data.progress.length;

        setStats({
          totalLessons: total,
          completedLessons: completed,
          inProgressLessons: inProgress,
        });

        // Encontrar la última lección en progreso o incompleta
        const lastInProgress = data.progress.find(p => p.status === 'IN_PROGRESS');
        const lastNotStarted = data.progress.find(p => p.status === 'NOT_STARTED');
        
        if (lastInProgress) {
          setLastLesson(lastInProgress.lessonId);
        } else if (lastNotStarted) {
          setLastLesson(lastNotStarted.lessonId);
        }
      }
      setIsLoading(false);
    }

    loadProgress();
  }, []);

  const progressPercentage = stats.totalLessons > 0 
    ? Math.round((stats.completedLessons / stats.totalLessons) * 100)
    : 0;

  const remainingLessons = useMemo(() => Math.max(stats.totalLessons - stats.completedLessons, 0), [stats]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>¡Bienvenido al Aula, {session?.user?.name || 'Trader'}! 🎓</h1>
          <p className={styles.heroSubtitle}>
            Continúa tu camino hacia la operativa profesional. Mantén la disciplina y avanza cada semana con la guía de la mentoría.
          </p>
          <div className={styles.pillRow}>
            <span className={styles.pill}>Mentoría en vivo</span>
            <span className={styles.pill}>Plan semanal</span>
            <span className={styles.pill}>Soporte prioritario</span>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Progreso total</p>
            <p className={styles.statValue}>{progressPercentage}%</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Lecciones completadas</p>
            <p className={styles.statValue}>{stats.completedLessons}</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>En progreso</p>
            <p className={styles.statValue}>{stats.inProgressLessons}</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Restantes</p>
            <p className={styles.statValue}>{remainingLessons}</p>
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <p className="text-sm text-blue-200/80 font-semibold">Tu progreso</p>
              <h3 className={styles.cardTitle}>Ruta de aprendizaje</h3>
            </div>
            <span className="text-sm text-gray-300">{progressPercentage}%</span>
          </div>

          <div className={styles.progressWrap}>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>{stats.completedLessons} de {stats.totalLessons} lecciones</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <p className="text-sm text-gray-300">En progreso</p>
              <p className="text-2xl font-bold text-white">{stats.inProgressLessons}</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <p className="text-sm text-gray-300">Por terminar</p>
              <p className="text-2xl font-bold text-white">{remainingLessons}</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          {lastLesson ? (
            <div className={styles.resume}>
              <p className="text-sm text-blue-100/90 font-semibold">Continuar</p>
              <h3 className="text-xl font-bold text-white">Sigue donde te quedaste</h3>
              <p className="text-blue-50/80">Retoma tu última lección y mantén el momentum.</p>
              <Link href={`/aula/lecciones/${lastLesson}`}>
                <Button variant="secondary" size="md" className="mt-2">
                  Continuar aprendiendo →
                </Button>
              </Link>
            </div>
          ) : (
            <div className={styles.empty}>
              <div className="text-5xl mb-3">📚</div>
              <h3 className={styles.emptyTitle}>Aún no tienes acceso a ningún programa</h3>
              <p className={styles.emptySubtitle}>Adquiere el programa premium para comenzar tu aprendizaje</p>
              <Link href="/">
                <Button variant="primary" size="lg">
                  Ver programas disponibles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
