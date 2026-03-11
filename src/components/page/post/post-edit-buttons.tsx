'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Instance from '@/api/instance';
import { myUpdateTag } from '@/api/revalidate';

import { Confirm } from '@/components/ui/confirm';
import useAdminStore from '@/stores/adminStore';
import clsx from 'clsx';
import { Eraser, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const buttonStyle =
  'flex h-9 w-9 cursor-pointer items-center justify-center hover:rounded-sm hover:bg-gray-400';

export default function PostEditButtons({ id }: { id: string }) {
  const [pending, setPending] = useState(false);
  const { adminState } = useAdminStore();
  const router = useRouter();

  async function handleDelete() {
    setPending(true);

    toast.promise(
      async () => {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );
        if (!access) {
          setPending(false);
          throw new Error('권한 없음');
        }

        const res = await Instance.delete(`/post/${id}`);

        if (!res.data.success) {
          setPending(false);
          throw new Error(res.data.message ?? '요청 실패');
        }

        console.log(res.data);

        myUpdateTag('posts');
        setPending(false);
        router.push(`/board/${res.data.data.board_name}/1`);

        return res.data.message ?? '요청 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }

  return (
    <div className="flex h-9 self-end">
      {adminState && (
        <>
          {pending ? (
            <div className={clsx(buttonStyle)}>
              <Eraser size={28} color="#ffffff" />
            </div>
          ) : (
            <Link className={clsx(buttonStyle)} href={`/edit/${id}`}>
              <Eraser size={28} color="#ffffff" />
            </Link>
          )}
          <Confirm
            title="게시글 삭제"
            description="삭제된 게시글은 복구가 불가능합니다."
            onClick={handleDelete}
          >
            <button disabled={pending} className={buttonStyle}>
              <Trash2 size={28} color="#ffffff" />
            </button>
          </Confirm>
        </>
      )}
    </div>
  );
}
