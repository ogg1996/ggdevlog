'use client';

import { getBoard } from '@/api/fetch';
import Instance from '@/api/instance';
import PostEditor from '@/components/page/edit/post-editor';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [boardList, setBoardList] = useState([]);
  const [post, setPost] = useState();

  useEffect(() => {
    async function init() {
      const res = await Instance.get('/accessCheck', {
        withCredentials: true
      });

      if (res.data.success) {
        const boardData = await getBoard();
        setBoardList(boardData);

        const postRes = await Instance.get(`/post/${id}`);
        setPost(postRes.data.data);
        setVisible(true);
      } else {
        alert(res.data.message);
        router.back();
      }
    }

    init();
  }, []);

  if (visible) return <PostEditor boardList={boardList} post={post} />;
}
