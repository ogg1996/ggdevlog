'use client';

import { getBoard } from '@/api/fetch';
import Instance from '@/api/instance';
import PostEditor from '@/components/page/edit/post-editor';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    async function init() {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        const boardData = await getBoard();
        setBoardList(boardData);
        setVisible(true);
      } else {
        alert('접근 권한이 없습니다.');
        router.back();
      }
    }

    init();
  }, []);
  if (visible) return <PostEditor boardList={boardList} />;
}
