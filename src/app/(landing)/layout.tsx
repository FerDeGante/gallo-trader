import BootcampNavBar from '@/components/bootcamp/BootcampNavBar';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Funding Bootcamp - Gallo Trader',
  description: 'Bootcamp intensivo para ayudarte a conseguir al menos una cuenta fondeada de $50K, con acceso por 4 meses y mentoría de Gallo y su equipo de traders expertos',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BootcampNavBar />
      {children}
      <Footer />
    </>
  );
}
