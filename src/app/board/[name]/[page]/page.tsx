import { notFound } from 'next/navigation';

import { getPosts } from '@/api/fetch';

import SectionTitle from '@/components/common/SectionTitle';
import PageNavigationBox from '@/components/page/board/page-navigation-box';
import PostList from '@/components/page/board/post-list';

export async function generateMetadata({
  params
}: {
  params: Promise<{ name: string; page: string }>;
}) {
  const board = await params;
  return {
    title: `GGDevLog - ${board.name}`,
    description: `${board.name} 게시판의 ${board.page}페이지`,
    openGraph: {
      title: `GGDevLog - ${board.name}`,
      description: `${board.name} 게시판의 ${board.page}페이지`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_MY_URL}/board-thumbnail.webp`,
          alt: '보드 페이지 썸네일'
        }
      ],
      locale: 'ko_KR',
      type: 'website'
    }
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ name: string; page: string }>;
}) {
  const CONTENT_LIMIT = 5;

  const { name, page } = await params;
  const posts = await getPosts(name, Number(page), CONTENT_LIMIT);

  if (!posts) notFound();

  return (
    <>
      <SectionTitle imageSrc="/board-thumbnail.webp">
        <h2 className="text-[32px]">
          {name}({posts.total})
        </h2>
      </SectionTitle>
      {posts.total !== 0 ? (
        <>
          <PostList data={posts.data} />
          <PageNavigationBox
            boardName={name}
            nowPage={posts.page}
            totalPage={posts.totalPage}
          />
        </>
      ) : (
        <div className="text-center text-[20px] font-bold">
          작성된 포스트가 없습니다.
        </div>
      )}
    </>
  );
}
