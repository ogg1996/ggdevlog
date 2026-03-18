'use client';
import clsx from 'clsx';

import { Confirm } from '@/components/common/confirm';
import { Post } from '@/types/post';

interface Props {
  post?: Post;
  pending: boolean;
  handleSave: () => void;
  handleCancel: () => void;
}

const buttonStyle = 'w-24 cursor-pointer rounded-lg px-4 py-2 text-white';

export default function PostEditorActionButtons({
  post,
  pending,
  handleSave,
  handleCancel
}: Props) {
  return (
    <div className="mt-5 flex justify-end gap-2">
      <Confirm
        title={`게시글 ${!post ? '작성' : '수정'} 취소`}
        description={`${!post ? '작성' : '수정'} 중인 변경사항이 모두 사라집니다.`}
        onClick={handleCancel}
      >
        <button
          disabled={pending}
          className={clsx(
            buttonStyle,
            'bg-red-400 hover:bg-red-500',
            'disabled:bg-gray-400 disabled:hover:bg-gray-400'
          )}
        >
          {!post ? '작성취소' : '수정취소'}
        </button>
      </Confirm>
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
