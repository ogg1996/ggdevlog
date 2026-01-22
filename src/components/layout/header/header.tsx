import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import MenubarButton from '@/components/layout/header/menubar-button';
import ThemeToggle from '@/components/layout/header/theme-toggle';

export default function Header() {
  return (
    <header
      className={clsx(
        'fixed z-40 h-12.5 w-full px-2',
        'flex items-center justify-between',
        'bg-white dark:bg-slate-900'
      )}
    >
      <div className="flex items-center gap-2">
        <MenubarButton />
        <Link className="flex h-15 items-center" href={'/'}>
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
