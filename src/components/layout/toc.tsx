'use client';

import Dimd from '@/components/layout/dimd';
import { TocItem } from '@/tiptap/utils/extract-toc';
import clsx from 'clsx';
import { TextAlignEnd } from 'lucide-react';
import { useState } from 'react';

export default function Toc({ tocItems }: { tocItems: TocItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 right-0 z-45 mt-12.5 w-80',
          'bg-white dark:bg-slate-900',
          'border-l-2 border-gray-100 dark:border-slate-800',
          'transform transition-transform duration-200 ease-out will-change-transform',
          open ? 'translate-x-0' : 'translate-x-full',
          open && 'z-50'
        )}
      >
        <button
          className={clsx(
            'absolute -left-11.5 cursor-pointer p-2',
            'bg-white dark:bg-slate-900',
            'rounded-bl-lg border-b-2 border-l-2',
            'border-gray-100 dark:border-slate-800'
          )}
          onClick={() => {
            setOpen(prev => !prev);
          }}
        >
          <TextAlignEnd size={28} color="#0099ff" />
        </button>
        <div
          className={clsx(
            'flex h-[calc(100vh-3.125rem)] flex-col gap-4 p-2',
            'overflow-y-auto overscroll-y-none',
            'border-gray-100 dark:border-slate-800'
          )}
        >
          <p className="text-[20px] font-bold">목차</p>
          <ul className="text-[14px]">
            {tocItems.map(item => (
              <li
                key={item.id}
                className={clsx(
                  'py-1',
                  item.level === 2 ? 'ml-2' : item.level === 3 ? 'ml-4' : ''
                )}
              >
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {open && (
        <Dimd
          scrollLock={false}
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
