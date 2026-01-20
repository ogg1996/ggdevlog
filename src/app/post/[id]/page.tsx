import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPost } from '@/api/fetch';

import dayjs from '@/components/common/utils/dayjs';
import PostEditButtons from '@/components/page/post/post-edit-buttons';
import TiptapViewer from '@/components/tiptap/tiptap-viewer';

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
      <div className="relative mb-7 h-50">
        <Image
          src={post.thumbnail?.image_url || '/post-thumbnail.webp'}
          alt="포스트 페이지 썸네일"
          className="object-cover object-center"
          fill
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-between bg-black/60 p-3 font-[duggeunmo] font-bold text-white">
          <PostEditButtons id={id} />
          <h2 className="self-center text-center text-[24px]">
            [{post.board.name}] {post.title}
          </h2>
          <span>{created}</span>
        </div>
      </div>
      <TiptapViewer content={post.content} />
    </>
  );
}
