'use client';

import '@/components/tiptap/styles/tiptap.css';

import { Editor, EditorContent } from '@tiptap/react';

import TiptapToolbar from '@/components/tiptap/toolbar/tiptap-toolbar';

interface Props {
  editor: Editor;
}

export default function TiptapEditor({ editor }: Props) {
  if (!editor)
    return (
      <div className="flex h-151.25 w-full items-center justify-center rounded-sm border border-slate-300 text-[32px]">
        에디터 로딩중...
      </div>
    );

  return (
    <div className="relative w-full rounded-sm border border-slate-300 p-2 select-text">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
