'use client';
import Image from 'next/image';

import clsx from 'clsx';

import useMenubarStore from '@/stores/menubarStore';

export default function MenubarButton() {
  const { setActive } = useMenubarStore();

  return (
    <button
      className={clsx(
        'h-11 w-11 cursor-pointer',
        'flex items-center justify-center',
        'hover:rounded-sm hover:bg-gray-200'
      )}
      onClick={() => {
        setActive(true);
      }}
    >
      <Image
        src="/icon-menu.png"
        alt="메뉴바 아이콘"
        width={36}
        height={36}
        priority
      />
    </button>
  );
}
