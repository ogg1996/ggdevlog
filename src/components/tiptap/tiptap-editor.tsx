'use client';

import '@/components/tiptap/styles/tiptap.css';

import { Editor, EditorContent } from '@tiptap/react';

import TiptapToolbar from '@/components/tiptap/toolbar/tiptap-toolbar';

interface Props {
  editor: Editor;
}

export default function TiptapEditor({ editor }: Props) {
  if (!editor) return <div>에이터 로딩중...</div>;

  return (
    <div
      className="relative w-full p-2
      border border-[#cccccc] rounded-[5px]"
    >
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
