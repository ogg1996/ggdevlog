import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import HeaderLogoutButton from '@/components/layout/header-logout-button';
import HeaderMenubarButton from '@/components/layout/header-menubar-button';
import HeaderThemeToggle from '@/components/layout/header-theme-toggle';

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
        <HeaderMenubarButton />
        <Link className="flex h-15 items-center" href={'/'}>
          <Image
            src="/logo.webp"
            alt="로고"
            width={130}
            height={30}
            style={{ width: 130, height: 30 }}
            priority
          />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <HeaderLogoutButton />
        <HeaderThemeToggle />
      </div>
    </header>
  );
}
