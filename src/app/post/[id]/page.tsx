import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPost } from '@/api/fetch';

import PostEditBox from '@/components/page/post/post-edit-box';
import Viewer from '@/components/common/viewer';

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getPost(id);

  return {
    title: `GGDevLog - ${post.title}`,
    description: post.description,
    openGraph: {
      title: `GGDevLog - ${post.title}`,
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

  const createdAtToDate = new Date(post.created_at);
  const year = createdAtToDate.getFullYear();
  const month = createdAtToDate.getMonth() + 1;
  const date = createdAtToDate.getDate();

  return (
    <>
      <div className="relative h-[200px] mb-7">
        <Image
          src={post.thumbnail?.image_url || '/post-thumbnail.webp'}
          alt="포스트 페이지 썸네일"
          className="object-cover object-center"
          fill
          priority
        />
        <div
          className="absolute inset-0 bg-[#00000099] 
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
