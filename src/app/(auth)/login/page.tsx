import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-[#0b1021] via-[#0f172a] to-[#111827] px-4 pt-36 pb-24 flex items-center justify-center">
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-white/70">Cargando...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
