import Instance from '@/axios/instance';
import Editor from '@/components/editor';

async function getBoard() {
  const res = await Instance.get('/board');

  return res.data;
}

async function getPost(id: string) {
  const res = await Instance.get(`/post/${id}`);

  return res.data;
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = await getBoard();
  const post = await getPost(id);

  return <Editor boardList={board.data} post={post.data} />;
}
