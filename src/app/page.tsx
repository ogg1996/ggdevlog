import Activity from '@/components/page/home/activity';
import Introduce from '@/components/page/home/introduce';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'GGDevLog - home',
  description: 'GGDevLog - 나의 개발 기록 저장소',
  openGraph: {
    title: 'GGDevLog - home',
    description: 'GGDevLog - 나의 개발 기록 저장소',
    images: [
      {
        url: '/home-thumbnail.png',
        alt: '홈 페이지 썸네일'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  }
};

export default async function Home() {
  return (
    <>
      <Activity />
      <Introduce />
    </>
  );
}
