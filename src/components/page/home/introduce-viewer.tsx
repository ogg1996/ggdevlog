'use client';

import '@/tiptap/styles/tiptap.css';

import { tiptapConfig } from '@/tiptap/config';
import { generateHTML, JSONContent } from '@tiptap/react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface Props {
  content: JSONContent;
}

export default function IntroduceViewer({ content }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const html = generateHTML(content, tiptapConfig.extensions);

  useEffect(() => {
    const el = wrapperRef.current;

    if (el) {
      if (open) {
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.maxHeight = '400px';
      }
    }
  }, [open]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative overflow-y-hidden transition-all duration-200"
        style={{ maxHeight: '400px' }}
      >
        <div
          className="tiptap prose max-w-none select-text focus:outline-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
