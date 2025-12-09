import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '¡Bienvenido al Bootcamp! - Gallo Trader',
  description: 'Tu inscripción ha sido confirmada',
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
