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
    <div className="relative w-full rounded-[5px] border border-[#cccccc] p-2">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
