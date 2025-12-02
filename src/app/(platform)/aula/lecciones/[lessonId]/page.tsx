'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Button from '@/components/ui/Button';
import styles from '../LessonPage.module.css';

interface Lesson {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  moduleId: number;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'>('NOT_STARTED');

  const demoVideos = useMemo(
    () => [
      'vIgw3dzQyOw',
      'g86WCcBhbR8',
      'nlRtdISav2I',
      'oAix75GgwsU',
    ],
    []
  );

  useEffect(() => {
    async function loadLesson() {
      setIsLoading(true);
      setError(null);

      // Cargar metadata de la lección
      const { data, error: lessonError } = await apiClient<{ lesson: Lesson }>(`/lessons/${lessonId}`);
      
      if (lessonError || !data?.lesson) {
        setError(lessonError || 'No se pudo cargar la lección');
        setIsLoading(false);
        return;
      }

      setLesson(data.lesson);
      setIsLoading(false);
    }

    loadLesson();
  }, [lessonId]);

  const handlePlayVideo = async () => {
    setIsLoadingVideo(true);
    setError(null);

    try {
      // Obtener token de acceso
      const { data: tokenData, error: tokenError } = await apiClient<{ token: string }>(
        `/lessons/${lessonId}/access-token`,
        { method: 'POST' }
      );

      if (tokenError || !tokenData?.token) {
        setError(tokenError || 'No se pudo obtener acceso a la lección');
        setIsLoadingVideo(false);
        return;
      }

      // Obtener URL del video
      const { data: playData, error: playError } = await apiClient<{ embedUrl: string }>(
        `/lessons/${lessonId}/play?token=${tokenData.token}`
      );

      if (playError || !playData?.embedUrl) {
        // Si falla, usa video demo en desarrollo para probar diseño
        if (process.env.NODE_ENV !== 'production') {
          const demoIndex = Math.abs(parseInt(lessonId as string, 10) || 0) % demoVideos.length;
          setEmbedUrl(`https://www.youtube.com/embed/${demoVideos[demoIndex]}?rel=0&modestbranding=1&controls=1&color=white&fs=1`);
        } else {
          setError(playError || 'No se pudo cargar el video');
          setIsLoadingVideo(false);
          return;
        }
      } else {
        setEmbedUrl(playData.embedUrl);
      }

      // Marcar como en progreso
      if (progress === 'NOT_STARTED') {
        await markProgress('IN_PROGRESS');
      }

      setIsLoadingVideo(false);
    } catch (err) {
      console.error('Error loading video:', err);
      setError('Error de conexión');
      setIsLoadingVideo(false);
    }
  };

  const markProgress = async (status: 'IN_PROGRESS' | 'COMPLETED') => {
    const { error: progressError } = await apiClient(
      `/lessons/${lessonId}/progress`,
      {
        method: 'POST',
        body: JSON.stringify({ status }),
      }
    );

    if (!progressError) {
      setProgress(status);
    }
  };

  const handleMarkCompleted = async () => {
    await markProgress('COMPLETED');
    // Opcional: mostrar mensaje de éxito
    alert('¡Lección completada! 🎉');
  };

  if (isLoading) {
    return (
      <div className={`${styles.page} flex items-center justify-center min-h-screen`}>
        <div className="text-center text-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando lección...</p>
        </div>
      </div>
    );
  }

  if (error && !lesson) {
    return (
      <div className={styles.page}>
        <div className={`${styles.card} ${styles.errorCard}`}>
          <div className="text-center py-10">
            <div className="text-5xl mb-3">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-gray-200 mb-6">{error}</p>
            <Button variant="primary" onClick={() => router.push('/aula')}>
              Volver al aula
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return null;
  }

  return (
    <div className={styles.page}>
      <button onClick={() => router.back()} className={styles.crumb}>
        ← Volver al aula
      </button>

      <div className={styles.header}>
        <h1 className={styles.title}>{lesson.title}</h1>
        {lesson.description && <p className={styles.subtitle}>{lesson.description}</p>}
        <div className={styles.meta}>
          Duración: {Math.floor(lesson.duration / 60)} minutos · ID {lesson.id}
        </div>
      </div>

      {error && (
        <div className={`${styles.card} ${styles.errorCard} mb-4`}>
          <p>{error}</p>
        </div>
      )}

      <div className={`${styles.card} ${styles.videoShell} mb-6`}>
        {!embedUrl ? (
          <div className={styles.videoPlaceholder}>
            <span className={styles.videoBadge}>Acceso seguro</span>
            <h3 className={styles.videoTitle}>Listo para ver esta lección</h3>
            <p className="text-gray-300 max-w-xl">
              Al reproducir validamos tu acceso y cargamos el video dentro del aula. Sin distracciones externas.
            </p>
            <div className={styles.actionsRow}>
              <Button
                variant="primary"
                size="lg"
                onClick={handlePlayVideo}
                isLoading={isLoadingVideo}
              >
                Reproducir video
              </Button>
              <div className={styles.highlight}>Contenido premium protegido</div>
            </div>
          </div>
        ) : (
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={lesson.title}
            />
          </div>
        )}
      </div>

      {embedUrl && progress !== 'COMPLETED' && (
        <div className={`${styles.card} ${styles.cardGrid}`}>
          <div>
            <p className="text-sm text-blue-200/80 font-semibold">Registro de avance</p>
            <h3 className="text-xl font-bold text-white">¿Terminaste esta lección?</h3>
            <p className="text-gray-300">
              Marca como completada para llevar tu progreso y desbloquear el siguiente módulo.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="primary" onClick={handleMarkCompleted}>
              Marcar como completada ✓
            </Button>
          </div>
        </div>
      )}

      {progress === 'COMPLETED' && (
        <div className={`${styles.card} ${styles.completionCard}`}>
          <div className={styles.success}>
            <div className={styles.successIcon}>✅</div>
            <p className="font-semibold text-white">¡Lección completada!</p>
          </div>
        </div>
      )}
    </div>
  );
}
