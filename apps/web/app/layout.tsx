import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Navigation } from '@/components/Header/Navigation/Navigation';
import './globals.css';
import { Header } from './components/Header/Header';

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/PretendardVariable.woff2',
    },
  ],
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'SFACLOG',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} font-pretendard`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
