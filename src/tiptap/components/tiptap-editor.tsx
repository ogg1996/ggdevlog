'use client';

import '@/tiptap/tiptap.css';

import { Editor, EditorContent } from '@tiptap/react';

import TiptapToolbar from '@/tiptap/components/toolbar/tiptap-toolbar';
import { Loader2Icon } from 'lucide-react';

interface Props {
  editor: Editor;
}

export default function TiptapEditor({ editor }: Props) {
  if (!editor)
    return (
      <div className="flex h-151.25 w-full items-center justify-center rounded-sm border border-slate-300 text-[32px]">
        <Loader2Icon className="size-20 animate-spin" color="#cad5e2" />
      </div>
    );

  return (
    <div className="relative w-full rounded-sm border border-slate-300 p-2 select-text">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
