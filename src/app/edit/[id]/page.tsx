import { notFound } from 'next/navigation';

import { getBoard, getPost } from '@/api/fetch';

import PostEditor from '@/components/page/edit/post-editor';

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPost(id);
  if (!post) notFound();

  const boardList = await getBoard();

  return <PostEditor boardList={boardList} post={post} />;
}
