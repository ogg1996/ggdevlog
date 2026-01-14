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
      <div
        className="bg-[#0099FF] mb-2 px-2 py-1 rounded-[4px]
        flex justify-between items-center gap-2"
      >
        <div
          className="font-[duggeunmo]
          text-[24px] text-white font-bold"
        >
          Introduce
        </div>
        {adminState && !edit && (
          <button
            className="w-[36px] h-[36px] flex justify-center items-center
            cursor-pointer hover:bg-gray-200 hover:rounded-[5px]"
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
