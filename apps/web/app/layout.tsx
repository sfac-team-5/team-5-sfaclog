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
  metadataBase: new URL('https://team-5-sfaclog-web.vercel.app'),
  title: 'SFACLOG',
  description: '스팩로그에서 성장의 길을 열어 보세요',
  openGraph: {
    title: 'SFACLOG',
    description: '스팩로그에서 성장의 길을 열어 보세요',
    images: '/opengraph-image.png',
  },
  twitter: {
    site: '@SFACLOG',
    title: 'SFACLOG',
    description: '스팩로그에서 성장의 길을 열어 보세요',
    images: '/twitter-image.png',
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
