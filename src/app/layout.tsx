import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import clsx from 'clsx';

import Header from '@/components/layout/header';

import ClientLayout from '@/app/client-layout';

const dungGeunmoMo = localFont({
  src: '../../public/fonts/DungGeunMo.woff2',
  display: 'swap',
  preload: true,
  weight: '400 900',
  variable: '--font-dungGeunMo'
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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={clsx(
          dungGeunmoMo.className,
          'bg-white text-black',
          'dark:bg-slate-900 dark:text-white'
        )}
        spellCheck="false"
      >
        <ClientLayout>
          <Header />
          <main className="mx-auto max-w-200 p-6 pt-15 font-[pretendard]">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
