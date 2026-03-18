'use client';

import Dimd from '@/components/layout/dimd';
import MenubarList from '@/components/layout/sidebar/menubar/menubar-list';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Menubar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 z-80 mt-12.5 w-60',
          'text-[16px] font-bold',
          'bg-white dark:bg-slate-900',
          'border-r-2 border-gray-100 dark:border-slate-800',
          'transform transition-transform duration-200 ease-out will-change-transform',
          open ? 'translate-x-0' : '-translate-x-full',
          open && 'z-100'
        )}
      >
        <button
          className={clsx(
            'absolute -right-11.5 cursor-pointer p-2',
            'bg-white dark:bg-slate-900',
            'rounded-br-lg border-r-2 border-b-2',
            'border-gray-100 dark:border-slate-800'
          )}
          onClick={() => {
            setOpen(prev => !prev);
          }}
        >
          <Menu size={28} color="#0099ff" />
        </button>
        <div
          className={clsx(
            'flex h-[calc(100vh-3.125rem)] flex-col px-3 py-2',
            'overflow-y-auto overscroll-y-none'
          )}
        >
          <div className="mb-2 text-[20px] text-[#0099ff]">게시판</div>
          <MenubarList
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
      </div>
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
