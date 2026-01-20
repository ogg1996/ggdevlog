'use client';

import { JSONContent, useEditor } from '@tiptap/react';

import Instance from '@/api/instance';

import { tiptapConfig } from '@/components/tiptap/config/tiptap-config';
import { extractImages } from '@/components/tiptap/utils/extract-images';

import TiptapEditor from '@/components/tiptap/tiptap-editor';

interface Props {
  content: JSONContent;
  setContent: React.Dispatch<React.SetStateAction<JSONContent>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IntroduceEditor({
  content,
  setContent,
  setEdit
}: Props) {
  const editor = useEditor(tiptapConfig);

  if (!editor) return null;

  editor.commands.setContent(content);

  async function handleSave() {
    try {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        const content = editor.getJSON();
        const images: string[] = [];

        extractImages(content, images);

        const res = await Instance.put('/introduce', {
          content,
          images
        }).then(res => res.data);

        alert(res.message);
        setContent(res.data.content);
        setEdit(false);
      } else {
        alert('접근 권한이 없습니다.');
      }
    } catch {
      alert('서버 오류');
    }
  }

  function handleCancel() {
    if (
      confirm('작성 중인 내용이 전부 사라집니다.\n정말로 취소하시겠습니까?')
    ) {
      setEdit(false);
      alert('취소되었습니다.');
    }
  }

  return (
    <div>
      <div className="min-h-[544px]">
        <TiptapEditor editor={editor} />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="w-24 cursor-pointer rounded-lg bg-red-400 px-4 py-2 font-[duggeunmo] text-white transition hover:bg-red-500"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="w-24 cursor-pointer rounded-lg bg-blue-400 px-4 py-2 font-[duggeunmo] text-white transition hover:bg-blue-600"
        >
          완료
        </button>
      </div>
    </div>
  );
}
