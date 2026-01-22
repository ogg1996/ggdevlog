'use client';
import clsx from 'clsx';

import MenubarHeader from '@/components/layout/menubar/menubar-header';
import MenubarList from '@/components/layout/menubar/menubar-list';
import MenubarTitle from '@/components/layout/menubar/menubar-title';

export default function Menubar() {
  return (
    <div
      className={clsx(
        'fixed z-50 min-h-screen',
        'flex flex-col gap-4 pr-2 pl-2',
        'text-[16px] font-bold text-[#0099ff]',
        'bg-white dark:bg-slate-900'
      )}
    >
      <MenubarHeader />
      <MenubarTitle />
      <MenubarList />
    </div>
  );
}
