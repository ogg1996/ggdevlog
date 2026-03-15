'use client';

import Dimd from '@/components/layout/dimd';
import MenubarList from '@/components/layout/modal/menubar/menubar-list';
import MenubarTitle from '@/components/layout/modal/menubar/menubar-title';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Menubar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 z-45 mt-12.5 w-55.5',
          'text-[16px] font-bold text-[#0099ff]',
          'bg-white dark:bg-slate-900',
          'border-r-2 border-gray-100 dark:border-slate-800',
          'transform transition-transform duration-200 ease-out will-change-transform',
          open ? 'translate-x-0' : '-translate-x-full',
          open && 'z-50'
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
            'flex h-[calc(100vh-3.125rem)] flex-col gap-2 p-2',
            'overflow-y-auto overscroll-y-none'
          )}
        >
          <MenubarTitle
            onClick={() => {
              setOpen(false);
            }}
          />
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
