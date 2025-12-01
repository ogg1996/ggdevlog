import { getPosts } from '@/api/fetch';
import PageNavigationBox from '@/components/page/board/page-navigation-box';
import PostList from '@/components/page/board/post-list';

export async function generateMetadata({
  params
}: {
  params: Promise<{ name: string; page: string }>;
}) {
  const board = await params;
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_META_DATA_BASE_URL}`),
    title: `GGDevLog - ${board.name}`,
    description: `${board.name} 게시판의 ${board.page}페이지`,
    openGraph: {
      title: `GGDevLog - ${board.name}`,
      description: `${board.name} 게시판의 ${board.page}페이지`,
      images: [
        {
          url: '/board-thumbnail.png',
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

  return (
    <>
      <div className="h-[200px] bg-[url(/board-thumbnail.png)] bg-cover bg-center mb-7">
        <div
          className="w-full h-full bg-[#00000099] 
          flex justify-center items-center"
        >
          <h2 className="font-[duggeunmo] font-bold text-[32px] text-white">
            {name}({posts.total})
          </h2>
        </div>
      </div>
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
