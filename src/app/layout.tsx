import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from '@/app/client-layout';
import localFont from 'next/font/local';

const dungGeunmoMo = localFont({
  src: '../../public/fonts/DungGeunMo.woff2',
  display: 'swap',
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
