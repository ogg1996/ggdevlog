'use client';

import Instance from '@/axios/instance';
import Editor from '@/components/editor';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    async function init() {
      const res = await Instance.get('/accessCheck', {
        withCredentials: true
      });

      if (res.data.success) {
        const boardRes = await Instance.get('/board');
        setBoardList(boardRes.data.data);
        setVisible(true);
      } else {
        alert(res.data.message);
        router.back();
      }
    }

    init();
  }, []);
  if (visible) return <Editor boardList={boardList} />;
}
