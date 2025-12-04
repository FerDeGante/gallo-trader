import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academia Gallo Trader - Programa Completo',
  description: 'Programa de trading de 4 meses con mentoría en vivo y acceso de por vida',
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
