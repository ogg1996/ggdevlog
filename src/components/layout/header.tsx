'use client';

import useMenubarStore from '@/stores/menubarStore';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { setActive } = useMenubarStore();

  return (
    <header className="flex justify-between items-center px-2 w-full h-[50px] fixed bg-white z-40">
      <div className="flex items-center gap-2">
        <button
          className="w-[44px] h-[44px] flex justify-center items-center
          cursor-pointer hover:bg-gray-200 hover:rounded-[5px]"
          onClick={() => {
            setActive(true);
          }}
        >
          <Image
            src="/icon-menu.png"
            alt="메뉴바 아이콘"
            width={36}
            height={36}
          />
        </button>
        <Link className="h-[60px] flex items-center" href={'/'}>
          <Image src="/logo.png" alt="로고 아이콘" width={130} height={30} />
        </Link>
      </div>
    </header>
  );
}
