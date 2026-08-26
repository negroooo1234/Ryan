import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RAYN // Maison Urbaine & Luxury Streetwear',
  description:
    'Elegante, urbana, moderna y premium. Fashion, Sneakers, Fragrance y Beauty dentro del mismo universo de lujo accesible.',
  keywords: [
    'RAYN',
    'Streetwear de Lujo',
    'Moda Urbana',
    'Sneakers Arquitectura',
    'Extrait de Parfum',
    'Minimalismo Negro y Plata',
    'Moda Unisex',
  ],
  authors: [{ name: 'RAYN Design Studio' }],
  openGraph: {
    title: 'RAYN // Elegante, Urbana & Sofisticada',
    description:
      'Lujo accesible + moda urbana + minimalismo con carácter. Descubre la colección oficial.',
    type: 'website',
    images: ['/images/campaign.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${jakarta.variable} ${spaceGrotesk.variable} scroll-smooth dark`}
    >
      <body className="bg-[#070708] text-[#F1F1F3] antialiased selection:bg-white selection:text-black min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
