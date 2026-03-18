import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import HeaderAdimDropdown from '@/components/layout/header/header-admin-dropdown';
import HeaderThemeToggle from '@/components/layout/header/header-theme-toggle';

export default function Header() {
  return (
    <header
      className={clsx(
        'fixed z-100 h-12.5 w-full px-2',
        'flex items-center justify-between',
        'bg-white dark:bg-slate-900',
        'overflow-y-hidden overscroll-y-none',
        'border-b-2 border-gray-100 dark:border-slate-800'
      )}
    >
      <div className="flex items-center gap-2">
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
        <HeaderAdimDropdown />
        <HeaderThemeToggle />
      </div>
    </header>
  );
}
