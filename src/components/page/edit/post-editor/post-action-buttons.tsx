'use client';
import clsx from 'clsx';

import { Post } from '@/components/common/types/types';

interface Props {
  post?: Post;
  handleSave: () => void;
  handleCancel: () => void;
}

const buttonStyle =
  'w-24 cursor-pointer rounded-lg px-4 py-2 font-[duggeunmo] text-white';

export default function PostActionButtons({
  post,
  handleSave,
  handleCancel
}: Props) {
  return (
    <div className="mt-5 flex justify-end gap-2">
      <button
        onClick={handleCancel}
        className={clsx(buttonStyle, 'bg-red-400 hover:bg-red-500')}
      >
        {!post ? '작성취소' : '수정취소'}
      </button>
      <button
        onClick={handleSave}
        className={clsx(buttonStyle, 'bg-blue-400 hover:bg-blue-600')}
      >
        {!post ? '작성완료' : '수정완료'}
      </button>
    </div>
  );
}
