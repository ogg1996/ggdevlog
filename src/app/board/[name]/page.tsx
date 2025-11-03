import Instance from '@/axios/instance';
import PostList from '@/components/post-list';

async function getPosts(name: string, page: number = 1, limit: number = 5) {
  const res = await Instance.get('/post', {
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
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const posts = await getPosts(name);
  console.log(posts);

  return (
    <>
      {posts.data.length !== 0 ? (
        <>
          <h2 className="text-[24px] font-bold mb-4">{name}</h2>
          <PostList data={posts.data} />
        </>
      ) : (
        <div>데이터가 없습니다</div>
      )}
    </>
  );
}
