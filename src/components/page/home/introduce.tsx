'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { JSONContent } from '@tiptap/react';

import Instance from '@/api/instance';

import useAdminStore from '@/stores/adminStore';

import IntroduceEditor from '@/components/page/home/introduce-editor';
import IntroduceViewer from '@/components/page/home/introduce-viewer';

export default function Introduce() {
  const { adminState } = useAdminStore();
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState<JSONContent | null>(null);

  useEffect(() => {
    async function init() {
      const res = await Instance.get('/introduce').then(res => res.data);
      setContent(res.data.content);
    }

    init();
  }, []);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2 rounded-[4px] bg-[#0099FF] px-2 py-1">
        <div className="font-[duggeunmo] text-[24px] font-bold text-white">
          Introduce
        </div>
        {adminState && !edit && (
          <button
            className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center hover:rounded-[5px] hover:bg-gray-200"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            <Image
              src="/icon-edit.png"
              alt="글쓰기 아이콘"
              width={28}
              height={28}
              priority
            />
          </button>
        )}
      </div>
      {content !== null &&
        (!edit ? (
          <IntroduceViewer content={content} />
        ) : (
          <IntroduceEditor
            content={content}
            setContent={setContent}
            setEdit={setEdit}
          />
        ))}
      {}
    </div>
  );
}
