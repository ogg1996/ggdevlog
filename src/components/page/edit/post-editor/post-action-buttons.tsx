'use client';
import clsx from 'clsx';

import { Post } from '@/components/common/types/types';

interface Props {
  post?: Post;
  pending: boolean;
  handleSave: () => void;
  handleCancel: () => void;
}

const buttonStyle =
  'w-24 cursor-pointer rounded-lg px-4 py-2 font-[duggeunmo] text-white';

export default function PostActionButtons({
  post,
  pending,
  handleSave,
  handleCancel
}: Props) {
  return (
    <div className="mt-5 flex justify-end gap-2">
      <button
        disabled={pending}
        onClick={handleCancel}
        className={clsx(
          buttonStyle,
          'bg-red-400 hover:bg-red-500',
          'disabled:bg-gray-400 disabled:hover:bg-gray-400'
        )}
      >
        {!post ? '작성취소' : '수정취소'}
      </button>
      <button
        disabled={pending}
        onClick={handleSave}
        className={clsx(
          buttonStyle,
          'bg-blue-400 hover:bg-blue-600',
          'disabled:bg-gray-400 disabled:hover:bg-gray-400'
        )}
      >
        {!post ? '작성완료' : '수정완료'}
      </button>
    </div>
  );
}
