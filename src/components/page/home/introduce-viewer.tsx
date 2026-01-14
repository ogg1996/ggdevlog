'use client';

import { useEffect, useRef, useState } from 'react';

import { JSONContent } from '@tiptap/react';

import TiptapViewer from '@/components/tiptap/tiptap-viewer';

interface Props {
  content: JSONContent;
}

export default function IntroduceViewer({ content }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;

    if (el) {
      if (open) {
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.maxHeight = '420px';
      }
    }
  }, [open]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative overflow-y-hidden transition-all duration-200"
        style={{ maxHeight: '420px' }}
      >
        <TiptapViewer content={content} />
        {!open && (
          <div
            className="
              absolute bottom-0 left-0 right-0 h-30
              pointer-events-none
              bg-gradient-to-t from-white to-transparent
            "
          />
        )}
      </div>
      {open ? (
        <button
          className="w-full h-12 font-bold cursor-pointer
         text-[#999999] text-[18px] rounded-[5px]
         hover:text-[#333333] hover:bg-[#eeeeee]"
          onClick={() => {
            setOpen(!open);
          }}
        >
          접기
        </button>
      ) : (
        <button
          className="w-full h-12 font-bold cursor-pointer
         text-[#999999] text-[18px] rounded-[5px]
         hover:text-[#333333] hover:bg-[#eeeeee]"
          onClick={() => {
            setOpen(!open);
          }}
        >
          더보기
        </button>
      )}
    </>
  );
}
