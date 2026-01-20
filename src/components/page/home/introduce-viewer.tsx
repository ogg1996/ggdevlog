'use client';

import { useEffect, useRef, useState } from 'react';

import { JSONContent } from '@tiptap/react';

import TiptapViewer from '@/components/tiptap/tiptap-viewer';
import clsx from 'clsx';

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
            className={clsx(
              'absolute right-0 bottom-0 left-0 h-30',
              'pointer-events-none bg-linear-to-t to-transparent',
              'from-white dark:from-slate-900'
            )}
          />
        )}
      </div>
      {open ? (
        <button
          className={clsx(
            'h-12 w-full rounded-sm',
            'cursor-pointer text-[18px] font-bold',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-slate-800',
            'hover:text-gray-800 dark:hover:text-gray-100'
          )}
          onClick={() => {
            setOpen(!open);
          }}
        >
          접기
        </button>
      ) : (
        <button
          className={clsx(
            'h-12 w-full rounded-sm',
            'cursor-pointer text-[18px] font-bold',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-slate-800',
            'hover:text-gray-800 dark:hover:text-gray-100'
          )}
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
