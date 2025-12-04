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
  title: "Gallo Trader - Programa Premium de Trading Profesional",
  description: "Domina el trading con nuestra estrategia matemática probada. 4 meses de formación intensiva, mentoría en vivo y acceso de por vida. Aprende a operar con disciplina y construye una fuente de ingresos consistente.",
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
