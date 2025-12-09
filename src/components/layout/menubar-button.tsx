'use client';
import Image from 'next/image';

import useMenubarStore from '@/stores/menubarStore';

export default function MenubarButton() {
  const { setActive } = useMenubarStore();

  return (
    <button
      className="w-[44px] h-[44px] flex justify-center items-center
      cursor-pointer hover:bg-gray-200 hover:rounded-[5px]"
      onClick={() => {
        setActive(true);
      }}
    >
      <Image src="/icon-menu.png" alt="메뉴바 아이콘" width={36} height={36} />
    </button>
  );
}
