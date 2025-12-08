import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Master Funding Bootcamp - Gallo Trader",
  description: "Bootcamp intensivo de 6 meses para conseguir tu primera cuenta fondeada de $100K. Sistema probado con mentoría directa de Gallo.",
  icons: {
    icon: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
