import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import clsx from 'clsx';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

import ClientLayout from '@/app/client-layout';
import Menubar from '@/components/layout/sidebar/menubar/menubar';
import { cn } from '@/shadcn-ui/lib/utils';
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const pretendard = localFont({
  src: '../../public/fonts/pretendardVariable.woff2',
  display: 'swap',
  preload: true,
  weight: '400 900',
  variable: '--font-pretendard'
});

export const metadata: Metadata = {
  title: 'GGDevLog',
  description: '개발 기록 저장소'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn('font-sans', geist.variable)}
    >
      <body
        className={clsx(
          pretendard.className,
          'bg-white text-black',
          'dark:bg-slate-900 dark:text-white'
        )}
        spellCheck="false"
      >
        <ClientLayout>
          <Menubar />
          <Header />
          <main className="mx-auto min-h-screen max-w-200 p-6 pt-30">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
