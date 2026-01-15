'use client';

import { Post } from '@/components/common/types/types';

interface Props {
  post?: Post;
  handleSave: () => void;
  handleCancel: () => void;
}

export default function PostActionButtons({
  post,
  handleSave,
  handleCancel
}: Props) {
  return (
    <div className="flex justify-end mt-5 gap-2">
      <button
        onClick={handleCancel}
        className="w-24 font-[duggeunmo] px-4 py-2 bg-red-400 text-white
              cursor-pointer rounded-lg hover:bg-red-500 transition"
      >
        {!post ? '작성취소' : '수정취소'}
      </button>
      <button
        onClick={handleSave}
        className="w-24 font-[duggeunmo] px-4 py-2 bg-blue-400 text-white
            cursor-pointer rounded-lg hover:bg-blue-600 transition"
      >
        {!post ? '작성완료' : '수정완료'}
      </button>
    </div>
  );
}
