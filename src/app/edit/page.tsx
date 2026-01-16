import { getBoard } from '@/api/fetch';

import PostEditor from '@/components/page/edit/post-editor/post-editor';

export default async function Page() {
  const boardList = await getBoard();

  return <PostEditor boardList={boardList} />;
}
