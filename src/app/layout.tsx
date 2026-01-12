import '@/styles/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

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
    <html lang="ko">
      <body className={`${dungGeunmoMo.className}`} spellCheck="false">
        <Header />
        <ClientLayout>
          <main
            className="font-[pretendard] max-w-[800px] mx-auto
            px-6 pt-15 py-6"
          >
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
