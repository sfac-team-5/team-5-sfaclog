import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ClientSessionProvider } from './components/Providers/ClientSessionProvider';
import Footer from './components/Footer/Footer';

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
        <ClientSessionProvider>{children}</ClientSessionProvider>
        <Footer />
      </body>
    </html>
  );
}
