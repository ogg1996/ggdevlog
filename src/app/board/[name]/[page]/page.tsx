import Instance from '@/axios/instance';
import PageNavigationBox from '@/components/page-navigation-box';
import PostList from '@/components/post-list';
import axios from 'axios';

async function getPosts(name: string, page: number = 1, limit: number = 5) {
  const res = await axios.get('http://localhost:4050/post', {
    params: {
      board_name: name,
      page,
      limit
    }
  });

  return res.data;
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
      {posts.data.length !== 0 ? (
        <>
          <PostList data={posts.data} />
          <PageNavigationBox
            boardName={name}
            nowPage={posts.page}
            totalPage={posts.totalPage}
          />
        </>
      ) : (
        <div>등록된 게시글이 없습니다</div>
      )}
    </>
  );
}
