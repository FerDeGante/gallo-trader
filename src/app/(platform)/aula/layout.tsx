'use client';

import { ReactNode } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import AulaSidebar from '@/components/aula/AulaSidebar';
import AulaHeader from '@/components/aula/AulaHeader';

interface AulaLayoutProps {
  children: ReactNode;
}

export default function AulaLayout({ children }: AulaLayoutProps) {
  return (
    <AuthGuard requireRole="STUDENT">
      <div className="min-h-screen flex bg-gradient-to-br from-[#070a14] via-[#0b1021] to-[#0f172a] text-white">
        <AulaSidebar />
        <div className="flex-1 flex flex-col">
          <AulaHeader />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
