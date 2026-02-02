import { Metadata } from 'next';

import Activity from '@/components/page/home/activity/activity';
import Introduce from '@/components/page/home/introduce/introduce';

export const metadata: Metadata = {
  title: 'GGDevLog - home',
  description: 'GGDevLog - 나의 개발 기록 저장소',
  openGraph: {
    title: 'GGDevLog - home',
    description: 'GGDevLog - 나의 개발 기록 저장소',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_MY_URL}/home-thumbnail.webp`,
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
