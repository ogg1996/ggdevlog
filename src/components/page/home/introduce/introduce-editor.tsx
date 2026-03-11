'use client';

import { JSONContent, useEditor } from '@tiptap/react';

import Instance from '@/api/instance';
import { myUpdateTag } from '@/api/revalidate';
import { tiptapConfig } from '@/components/tiptap/config/tiptap-config';
import TiptapEditor from '@/components/tiptap/tiptap-editor';
import { extractImages } from '@/components/tiptap/utils/extract-images';
import { Confirm } from '@/components/ui/confirm';
import clsx from 'clsx';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  content: JSONContent;
  setContent: React.Dispatch<React.SetStateAction<JSONContent>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const buttonStyle =
  'w-24 cursor-pointer rounded-lg px-4 py-2 font-[duggeunmo] text-white';

export default function IntroduceEditor({
  content,
  setContent,
  setEdit
}: Props) {
  const [pending, setPending] = useState(false);
  const editor = useEditor(tiptapConfig);

  if (!editor) return null;

  editor.commands.setContent(content);

  async function handleSave() {
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

        const content = editor.getJSON();
        const images: string[] = [];

        extractImages(content, images);

        const res = await Instance.put('/introduce', {
          content,
          images
        }).then(res => res.data);

        if (!res.data.success) {
          setPending(false);
          throw new Error(res.data.message ?? '요청 실패');
        }

        myUpdateTag('introduce');
        setContent(res.data.content);
        setEdit(false);
        setPending(false);

        return res.data.message ?? '요청 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }

  function handleCancel() {
    setEdit(false);
    toast.success('취소 되었습니다.');
  }

  return (
    <div>
      <div className="min-h-136">
        <TiptapEditor editor={editor} />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Confirm
          title="자기소개 수정 취소"
          description="수정 중인 변경사항이 모두 사라집니다."
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
            취소
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
          완료
        </button>
      </div>
    </div>
  );
}
