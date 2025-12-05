import { Syne, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';

// Syne for headings - bold geometric font perfect for crypto/web3
const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

// Inter for body text - clean, modern, highly legible
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Paystrata',
  description: 'Paystrata - A modern payment solution built on Starknet',
  keywords: ['Paystrata', 'Starknet', 'crypto payments', 'blockchain payments', 'web3'],
  authors: [{ name: 'Paystrata Team' }],
  creator: 'Paystrata',
  publisher: 'Paystrata',
  metadataBase: new URL('https://usePaystrata.com'),
  openGraph: {
    title: 'Paystrata',
    description: 'Paystrata - A modern payment solution built on StarkNet',
    url: 'https://usePaystrata.com',
    siteName: 'Paystrata',
    images: [
      {
        url: '/img/logo.png',
        width: 1200,
        height: 630,
        alt: 'Paystrata',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paystrata',
    description: 'Paystrata - A modern payment solution built on StarkNet',
    images: ['/img/logo.png'],
    creator: '@Paystrata',
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
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} antialiased`}>
        <NextTopLoader 
          color="#02ff87"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #00D4AA,0 0 5px #00D4AA"
        />
        <Toaster 
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              border: '1px solid rgba(0, 212, 170, 0.2)',
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
