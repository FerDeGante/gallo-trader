'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

interface Lesson {
  id: number;
  title: string;
  duration: number;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Program {
  id: number;
  title: string;
  modules: Module[];
}

export default function AulaSidebar() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const pathname = usePathname();

  useEffect(() => {
    async function loadPrograms() {
      const { data } = await apiClient<{ programs: Program[] }>('/aula/outline');
      
      if (data?.programs) {
        setPrograms(data.programs);
        // Expandir el primer módulo por defecto
        if (data.programs[0]?.modules[0]) {
          setExpandedModules(new Set([data.programs[0].modules[0].id]));
        }
      }
      setIsLoading(false);
    }

    loadPrograms();
  }, []);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  return (
    <aside className="w-80 bg-[#0a0f1c] text-white flex flex-col h-screen border-r border-white/5">
      <div className="p-6 border-b border-white/5">
        <Link href="/aula" className="flex items-center gap-3">
          <span className="text-3xl">🐓</span>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-200/80">Gallo Trader</p>
            <p className="text-lg font-bold">Tu Aula</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/5 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center text-gray-300 py-8">
            <p>No tienes acceso a ningún programa.</p>
            <Link href="/" className="text-orange-500 hover:text-orange-400 text-sm mt-2 inline-block">
              Ver programas disponibles
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {programs.map(program => (
              <div key={program.id}>
                <h3 className="font-bold text-sm text-gray-200 mb-3 px-2">
                  {program.title}
                </h3>
                <div className="space-y-2">
                  {program.modules.map((module, moduleIndex) => (
                    <div key={module.id}>
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between border border-white/5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-orange-400 font-bold text-sm">
                            {moduleIndex + 1}.
                          </span>
                          <span className="text-sm font-medium text-gray-100">{module.title}</span>
                        </div>
                        <span className="text-gray-400">
                          {expandedModules.has(module.id) ? '−' : '+'}
                        </span>
                      </button>
                      
                      {expandedModules.has(module.id) && (
                        <div className="ml-6 mt-1 space-y-1">
                          {module.lessons.map((lesson, lessonIndex) => {
                            const lessonPath = `/aula/lecciones/${lesson.id}`;
                            const isActive = pathname === lessonPath;
                            
                            return (
                              <Link
                                key={lesson.id}
                                href={lessonPath}
                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                  isActive
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                                    : 'text-gray-200 hover:bg-white/5'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs opacity-70">
                                    {moduleIndex + 1}.{lessonIndex + 1}
                                  </span>
                                  <span>{lesson.title}</span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link href="/">
          <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
            ← Volver al inicio
          </button>
        </Link>
      </div>
    </aside>
  );
}
