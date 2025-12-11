import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bootcamp de Trading 2025 | Master Funding Bootcamp - Fondéate con $50K USD",
  description: "🚀 Bootcamp de Trading profesional para conseguir cuenta fondeada. Aprende estrategias probadas con +700 trades reales. Mentoría de traders fondeados. Sistema paso a paso de 4 meses. Inscríbete al mejor bootcamp de trading en México.",
  keywords: [
    "bootcamp de trading",
    "bootcamp trading",
    "curso trading",
    "cuenta fondeada",
    "trading bootcamp méxico",
    "aprender trading",
    "estrategias de trading",
    "trading profesional",
    "prop trading",
    "funding trading",
    "curso forex",
    "mentoria trading"
  ],
  authors: [{ name: "Master Funding Bootcamp" }],
  creator: "Master Funding Bootcamp",
  publisher: "Master Funding Bootcamp",
  alternates: {
    canonical: "https://www.mfb.mx"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/Logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/Logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/Logo.png',
    shortcut: '/Logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://www.mfb.mx',
    siteName: 'Master Funding Bootcamp',
    title: "Bootcamp de Trading 2025 | Fondéate con $50K USD",
    description: "🚀 El mejor bootcamp de trading en México. Estrategia probada con +700 trades. Mentoría de traders fondeados. Sistema paso a paso para conseguir tu cuenta fondeada de $50K USD.",
    images: [
      {
        url: 'https://www.mfb.mx/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Master Funding Bootcamp - Bootcamp de Trading',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bootcamp de Trading 2025 | Master Funding Bootcamp",
    description: "🚀 Aprende trading profesional y consigue tu cuenta fondeada. Estrategia probada con +700 trades. Sistema paso a paso de 4 meses.",
    images: ['https://www.mfb.mx/Logo.png'],
    creator: '@MFBootcamp',
  },
  verification: {
    google: 'tu-codigo-de-verificacion-de-google-search-console',
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
