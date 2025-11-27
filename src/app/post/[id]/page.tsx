import PostEditBox from '@/components/page/post/post-edit-box';
import Viewer from '@/components/common/viewer';
import { getPost } from '@/api/fetch';

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  const createdAtToDate = new Date(post.created_at);
  const year = createdAtToDate.getFullYear();
  const month = createdAtToDate.getMonth() + 1;
  const date = createdAtToDate.getDate();

  return (
    <>
      <div
        className="h-[200px] bg-cover bg-center mb-7"
        style={{
          backgroundImage: `url(${
            post.thumbnail?.image_url || '/post-thumbnail.png'
          })`
        }}
      >
        <div
          className="w-full h-full bg-[#00000099] 
          flex flex-col justify-between p-3"
        >
          <PostEditBox id={id} />
          <h2
            className="font-[duggeunmo] font-bold
            text-[24px] text-center text-white self-center"
          >
            {post.title}
          </h2>
          <span
            className="font-[duggeunmo] 
            font-bold text-white"
          >
            {`${year}. ${month}. ${date}`}
          </span>
        </div>
      </div>
      <Viewer content={post.content} />
    </>
  );
}
