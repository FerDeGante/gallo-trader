import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Master Funding Bootcamp - Fondéate con $50K USD",
  description: "¿Te imaginas fondearte con $50K USD en las próximas semanas? Estrategia sencilla y clara, probada con más de 700 trades. Acompañamiento de traders fondeados para ayudarte a lograr tus metas. Sistema paso a paso de 4 meses.",
  icons: {
    icon: '/Logo.png',
    apple: '/Logo.png',
  },
  openGraph: {
    title: "Master Funding Bootcamp - Fondéate con $50K USD",
    description: "Estrategia probada con más de 700 trades. Acompañamiento de traders fondeados. Sistema paso a paso de 4 meses para conseguir tu cuenta fondeada.",
    images: ['/Logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Master Funding Bootcamp - Fondéate con $50K USD",
    description: "Estrategia probada con más de 700 trades. Sistema paso a paso de 4 meses para conseguir tu cuenta fondeada.",
    images: ['/Logo.png'],
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
        </Providers>
      </body>
    </html>
  );
}
