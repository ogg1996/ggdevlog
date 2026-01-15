'use client';
import Image from 'next/image';

import useMenubarStore from '@/stores/menubarStore';

export default function MenubarButton() {
  const { setActive } = useMenubarStore();

  return (
    <button
      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center hover:rounded-[5px] hover:bg-gray-200"
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
