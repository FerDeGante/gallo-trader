import BootcampNavBar from '@/components/bootcamp/BootcampNavBar';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Funding Bootcamp - Gallo Trader',
  description: 'Bootcamp intensivo para conseguir tu primera cuenta fondeada de $100K en 7 días',
};

export default function BootcampLayout({
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
