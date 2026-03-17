'use client';

import Dimd from '@/components/layout/dimd';
import { useActiveTocItemIds } from '@/tiptap/hooks/useActiveTocItemIds';

import { TocItem } from '@/tiptap/utils/extract-toc';
import clsx from 'clsx';
import { TextAlignEnd } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Toc({ tocItems }: { tocItems: TocItem[] }) {
  const [open, setOpen] = useState(false);

  const tocIds: string[] = useMemo(
    () => tocItems.map(item => item.id),
    [tocItems]
  );

  const activeTocItemIds = useActiveTocItemIds(tocIds);

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 right-0 z-80 mt-12.5 w-80',
          'bg-white dark:bg-slate-900',
          'border-l-2 border-gray-100 dark:border-slate-800',
          'transform transition-transform duration-200 ease-out will-change-transform',
          open ? 'translate-x-0' : 'translate-x-full',
          open && 'z-100'
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
            'flex h-[calc(100vh-3.125rem)] flex-col px-3 py-2',
            'overflow-y-auto overscroll-y-none',
            'border-gray-100 dark:border-slate-800'
          )}
        >
          <p className="text-[20px] font-bold text-[#0099ff]">목차</p>
          <ul className="no-scrollbar mt-1.5 mb-3 grow overflow-y-auto border-b-2 text-[14px]">
            {tocItems.map(item => (
              <li
                key={item.id}
                className={clsx(
                  'my-1 border-l-4 border-transparent',
                  item.level === 2
                    ? 'pl-4'
                    : item.level === 3
                      ? 'pl-6'
                      : 'pl-2',
                  activeTocItemIds.includes(item.id) && 'border-l-[#0099ff]'
                )}
              >
                <a
                  className={clsx(
                    'font-bold text-gray-500 dark:text-slate-500',
                    activeTocItemIds.includes(item.id) &&
                      'text-gray-800 dark:text-white'
                  )}
                  href={`#${item.id}`}
                >
                  {item.text}
                </a>
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
