'use client';

import MenubarHeader from '@/components/layout/modal/menubar/menubar-header';
import MenubarList from '@/components/layout/modal/menubar/menubar-list';
import MenubarTitle from '@/components/layout/modal/menubar/menubar-title';
import useModalStore from '@/stores/modalStore';
import clsx from 'clsx';

export default function Menubar() {
  const { modalState } = useModalStore();
  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 min-h-screen w-55.5',
          'flex flex-col gap-4 px-2',
          'text-[16px] font-bold text-[#0099ff]',
          'bg-white dark:bg-slate-900',
          'transform transition-transform duration-200 ease-out will-change-transform',
          modalState === 'menubar' ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <MenubarHeader />
        <MenubarTitle />
        <MenubarList />
      </div>
    </>
  );
}
