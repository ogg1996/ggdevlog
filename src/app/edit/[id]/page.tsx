'use client';

import { getBoard, getPost } from '@/api/fetch';
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
      const access = await Instance.get('/auth/accessCheck', {
        withCredentials: true
      }).then(res => res.data.success);

      if (access) {
        const boardData = await getBoard();
        setBoardList(boardData);

        const postData = await getPost(id);
        setPost(postData);
        setVisible(true);
      } else {
        alert('접근 권한이 없습니다');
        router.back();
      }
    }

    init();
  }, []);

  if (visible) return <PostEditor boardList={boardList} post={post} />;
}
