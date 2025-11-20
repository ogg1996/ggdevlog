'use client';

import Instance from '@/axios/instance';
import IntroduceEditor from '@/components/page/home/introduce-editor';
import IntroduceViewer from '@/components/page/home/introduce-viewer';
import useAdminStore from '@/stores/adminStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Introduce() {
  const { adminState } = useAdminStore();
  const [edit, setEdit] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [originalImages, setOriginalImages] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      const res = await Instance.get('/introduce');
      setOriginalImages(res.data.images);
      setOriginalContent(res.data.content);
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
            />
          </button>
        )}
      </div>
      {!edit ? (
        <IntroduceViewer content={originalContent} />
      ) : (
        <IntroduceEditor
          originalContent={originalContent}
          setOriginalContent={setOriginalContent}
          originalImages={originalImages}
          setOriginalImages={setOriginalImages}
          setEdit={setEdit}
        />
      )}
    </div>
  );
}
