import Instance from '@/axios/instance';
import Editor from '@/components/editor';

async function getBoard() {
  const res = await Instance.get('/board');

  return res.data;
}

export default async function Page() {
  const board = await getBoard();

  return <Editor boardList={board.data} />;
}
