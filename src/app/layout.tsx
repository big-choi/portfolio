import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { profile } from '@/data/profile';
import { siteUrl } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.role}`,
  description: profile.tagline,
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
