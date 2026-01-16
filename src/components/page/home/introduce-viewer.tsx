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
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-30 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {open ? (
        <button
          className="h-12 w-full cursor-pointer rounded-[5px] text-[18px] font-bold text-[#999999] hover:bg-[#eeeeee] hover:text-[#333333]"
          onClick={() => {
            setOpen(!open);
          }}
        >
          접기
        </button>
      ) : (
        <button
          className="h-12 w-full cursor-pointer rounded-[5px] text-[18px] font-bold text-[#999999] hover:bg-[#eeeeee] hover:text-[#333333]"
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
