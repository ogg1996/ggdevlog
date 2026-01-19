import Image from 'next/image';
import Link from 'next/link';

import MenubarButton from '@/components/layout/menubar-button';
import ThemeToggle from '@/components/layout/theme-toggle';

export default function Header() {
  return (
    <header className="fixed z-40 flex h-[50px] w-full items-center justify-between bg-white px-2 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <MenubarButton />
        <Link className="flex h-[60px] items-center" href={'/'}>
          <Image
            src="/logo.webp"
            alt="로고 아이콘"
            width={130}
            height={30}
            priority
          />
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
}
