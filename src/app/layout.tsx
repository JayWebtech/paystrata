import { Orbitron, Sora } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
});

export const metadata = {
  title: 'StarkPay',
  description: 'StarkPay - A modern payment solution built on Starknet',
  keywords: ['StarkPay', 'Starknet', 'crypto payments', 'blockchain payments', 'web3'],
  authors: [{ name: 'StarkPay Team' }],
  creator: 'StarkPay',
  publisher: 'StarkPay',
  metadataBase: new URL('https://usestarkpay.com'),
  openGraph: {
    title: 'StarkPay',
    description: 'StarkPay - A modern payment solution built on StarkNet',
    url: 'https://usestarkpay.com',
    siteName: 'StarkPay',
    images: [
      {
        url: '/img/logo.png',
        width: 1200,
        height: 630,
        alt: 'StarkPay',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StarkPay',
    description: 'StarkPay - A modern payment solution built on StarkNet',
    images: ['/img/logo.png'],
    creator: '@starkpay',
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
  // verification: {
  //   google: 'your-google-site-verification',
  // },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${orbitron.variable} antialiased`}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
