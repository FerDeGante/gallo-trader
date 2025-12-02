'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import styles from './ProgramContentSection.module.css';

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  duration: number;
}

interface Program {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

export default function ProgramContentSection() {
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProgram() {
      const { data } = await apiClient<{ programs: Program[] }>('/programs');
      
      if (data && data.programs && data.programs.length > 0) {
        setProgram(data.programs[0]);
      }
      setIsLoading(false);
    }

    loadProgram();
  }, []);

  if (isLoading) {
    return (
      <section id="programa" className={styles.section}>
        <div className={styles.header}>
          <div className="animate-pulse">
            <div className="h-12 bg-white/10 rounded w-2/3 mx-auto mb-6"></div>
            <div className="h-6 bg-white/10 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!program) {
    return null;
  }

  const totalLessons = program.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const totalHours = Math.floor(
    program.modules.reduce(
      (acc, mod) => acc + mod.lessons.reduce((sum, lesson) => sum + lesson.duration, 0),
      0
    ) / 60
  );

  return (
    <section id="programa" className={styles.section}>
      <div className={styles.backgroundGrid} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Plan de Estudios</span>
          <h2 className={styles.title}>
            Contenido del Programa
          </h2>
          <p className={styles.subtitle}>
            {program.description}
          </p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{program.modules.length}</div>
              <div className={styles.statLabel}>Módulos</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{totalLessons}</div>
              <div className={styles.statLabel}>Lecciones</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{totalHours}+</div>
              <div className={styles.statLabel}>Horas</div>
            </div>
          </div>
        </div>

        <div className={styles.modulesGrid}>
          {program.modules.map((module, index) => (
            <div key={module.id} className={styles.moduleCard}>
              <div className={styles.moduleHeader}>
                <div className={styles.moduleNumber}>
                  {index + 1}
                </div>
                <div className={styles.moduleMeta}>
                  {module.lessons.length} lecciones
                </div>
              </div>
              
              <h3 className={styles.moduleTitle}>{module.title}</h3>
              <p className={styles.moduleDescription}>{module.description}</p>
              
              <div className={styles.moduleFooter}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
