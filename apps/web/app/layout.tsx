import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ClientSessionProvider } from '@/components/Providers/ClientSessionProvider';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';

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
  openGraph: {
    title: 'SFACLOG',
    description: '스팩로그에서 성장의 길을 열어 보세요',
    // url: 'https://nextjs.org',
    siteName: 'SFACLOG',
    images: './opengraph-image.png',
  },
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} font-pretendard`}>
        {modal}
        <Header />
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
