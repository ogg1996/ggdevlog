import { getPost } from '@/api/fetch';
import SectionTitle from '@/components/common/section-title';
import PostActionButtons from '@/components/page/post/post-action-buttons';
import TiptapViewer from '@/tiptap/components/tiptap-viewer';
import dayjs from '@/utils/dayjs';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);

  return {
    title: `GGDevLog - [${post.board.name}] ${post.title}`,
    description: post.description,
    openGraph: {
      title: `GGDevLog - [${post.board.name}] ${post.title}`,
      description: post.description,
      images: [
        {
          url:
            post.thumbnail?.image_url ||
            `${process.env.NEXT_PUBLIC_MY_URL}/post-thumbnail.webp`,
          alt: '포스트 페이지 썸네일'
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();
  const created = dayjs(post.created_at).tz().format('YYYY. MM. DD');

  return (
    <>
      <SectionTitle
        imageSrc={post.thumbnail?.image_url || '/post-thumbnail.webp'}
      >
        <div className="flex h-full w-full flex-col justify-between p-3">
          <PostActionButtons id={id} />
          <h2 className="self-center text-center text-[24px]">
            [{post.board.name}] {post.title}
          </h2>
          <span>{created}</span>
        </div>
      </SectionTitle>
      <div className="rounded-sm bg-gray-200 p-4 select-text dark:bg-slate-700">
        {post.description}
      </div>
      <TiptapViewer content={post.content} />
    </>
  );
}
