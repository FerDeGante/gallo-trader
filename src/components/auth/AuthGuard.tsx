'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  requireRole?: 'ADMIN' | 'STUDENT';
}

export default function AuthGuard({ children, requireRole }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    // Si se requiere un rol específico y el usuario no lo tiene
    if (requireRole && session.user.role !== requireRole) {
      // Redirigir según el rol del usuario
      if (session.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/aula');
      }
      return;
    }

    // Si NO se requiere un rol específico, redirigir según el rol del usuario
    // Esto previene que admins accedan al aula por error
    if (!requireRole) {
      if (session.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/aula');
      }
    }
  }, [session, status, router, requireRole]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (requireRole && session.user.role !== requireRole) {
    return null;
  }

  return <>{children}</>;
}
