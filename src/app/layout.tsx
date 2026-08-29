import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rayn.com.py'
  ),
  title: 'RAYN',
  description:
    'Tu estilo, en un solo lugar. Curaduría y reventa exclusiva de ropa streetwear, sneakers, fundas para iPhone y perfumes árabes & nicho. Fundada por Nayhara Sanabria y Rodrigo Hidalgo (Presidente Franco, Paraguay). Envíos a todo el país. Instagram: @rayn_py.',
  keywords: [
    'RAYN',
    'rayn_py',
    'RAYN Paraguay',
    'Presidente Franco',
    'Presidente Franco Paraguay',
    'Streetwear Paraguay',
    'Sneakers Paraguay',
    'Perfumes Arabes Paraguay',
    'Fundas iPhone Paraguay',
    'Nayhara Sanabria',
    'Rodrigo Hidalgo',
    'Envíos a todo el Paraguay',
  ],
  authors: [
    { name: 'RAYN (@rayn_py)', url: 'https://www.instagram.com/rayn_py/' },
    { name: 'Nayhara Sanabria (@nayysanabria)', url: 'https://www.instagram.com/nayysanabria/' },
    { name: 'Rodrigo Hidalgo (@rodrigo_hidalgo06)', url: 'https://www.instagram.com/rodrigo_hidalgo06/' },
  ],
  openGraph: {
    title: 'RAYN // Fashion • Beauty • Sneakers — Tu estilo, en un solo lugar',
    description:
      'Paraguay, envíos a todo el país 📦📤. Instagram Oficial: @rayn_py. CEOs: @nayysanabria & @rodrigo_hidalgo06.',
    type: 'website',
    images: ['/images/campaign.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/RAYN-2.svg', type: 'image/svg+xml' },
      { url: '/RAYN-2.png' },
      { url: '/RAYN-2.png', sizes: '32x32', type: 'image/png' },
      { url: '/RAYN-2.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/RAYN-2.png',
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
