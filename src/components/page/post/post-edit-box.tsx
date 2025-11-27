'use client';

import Instance from '@/api/instance';
import useAdminStore from '@/stores/adminStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PostEditBox({ id }: { id: string }) {
  const { adminState } = useAdminStore();
  const router = useRouter();

  async function handleDelete() {
    if (confirm('정말로 게시글을 삭제 하시겠습니까?')) {
      try {
        const res = await Instance.delete(`/post/${id}`);
        if (res.data.success) {
          alert(res.data.message);
          router.push(`/board/${res.data.board_name}/1`);
        } else {
          alert(res.data.message);
        }
      } catch (e) {
        alert('서버 오류로 인한 실패');
      }
    }
  }

  return (
    <div className="self-end h-[36px] flex ">
      {adminState && (
        <>
          <Link
            className="w-[36px] h-[36px] flex justify-center items-center
              cursor-pointer hover:bg-gray-400 hover:rounded-[5px]"
            href={`/edit/${id}`}
          >
            <Image
              src="/icon-update-edit.png"
              alt="글쓰기 아이콘"
              width={28}
              height={28}
            />
          </Link>
          <button
            className={`w-[36px] h-[36px] flex justify-center items-center
              cursor-pointer hover:bg-gray-400 hover:rounded-[5px]`}
            onClick={handleDelete}
          >
            <Image
              src="/icon-delete.png"
              alt="설정 아이콘"
              width={28}
              height={28}
            />
          </button>
        </>
      )}
    </div>
  );
}
