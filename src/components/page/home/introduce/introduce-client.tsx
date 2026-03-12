'use client';

import IntroduceEditButton from '@/components/page/home/introduce/introduce-edit-button';
import IntroduceEditor from '@/components/page/home/introduce/introduce-editor';
import { JSONContent } from '@tiptap/react';
import { Loader2Icon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const IntroduceViewer = dynamic(() => import('./introduce-viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-105 items-center justify-center text-[32px]">
      <Loader2Icon className="size-20 animate-spin" color="#0099ff" />
    </div>
  )
});

interface Props {
  introduce: JSONContent;
}

export default function IntroduceClient({ introduce }: Props) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState<JSONContent>(introduce);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2 rounded-sm bg-[#0099ff] px-2 py-1">
        <div className="font-[duggeunmo] text-[24px] font-bold text-white">
          Introduce
        </div>
        <IntroduceEditButton setEdit={setEdit} />
      </div>
      {!edit ? (
        <IntroduceViewer content={content} />
      ) : (
        <IntroduceEditor
          content={content}
          setContent={setContent}
          setEdit={setEdit}
        />
      )}
    </div>
  );
}
