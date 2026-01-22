'use client';
import { useEffect, useState } from 'react';

import { JSONContent } from '@tiptap/react';
import { Pencil } from 'lucide-react';

import Instance from '@/api/instance';

import useAdminStore from '@/stores/adminStore';

import IntroduceEditor from '@/components/page/home/introduce/introduce-editor';
import IntroduceViewer from '@/components/page/home/introduce/introduce-viewer';

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
      <div className="mb-2 flex items-center justify-between gap-2 rounded-sm bg-[#0099ff] px-2 py-1">
        <div className="font-[duggeunmo] text-[24px] font-bold text-white">
          Introduce
        </div>
        {adminState && !edit && (
          <button
            className="flex h-9 w-9 cursor-pointer items-center justify-center hover:rounded-sm hover:bg-gray-200"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            <Pencil size={24} color="#0099ff" />
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
