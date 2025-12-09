import Image from 'next/image';
import Link from 'next/link';

import MenubarButton from '@/components/layout/menubar-button';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-2 w-full h-[50px] fixed bg-white z-40">
      <div className="flex items-center gap-2">
        <MenubarButton />
        <Link className="h-[60px] flex items-center" href={'/'}>
          <Image src="/logo.png" alt="로고 아이콘" width={130} height={30} />
        </Link>
      </div>
    </header>
  );
}
