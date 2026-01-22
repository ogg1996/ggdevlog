'use client';
import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';
import { X } from 'lucide-react';

import useMenubarStore from '@/stores/menubarStore';

export default function MenubarHeader() {
  const { setActive } = useMenubarStore();

  return (
    <div className="flex h-12.5 items-center gap-2 pr-6">
      <button
        className={clsx(
          'h-11 w-11 cursor-pointer',
          'flex items-center justify-center',
          'hover:rounded-sm hover:bg-gray-200'
        )}
        onClick={() => {
          setActive(false);
        }}
      >
        <X size={36} color="#0099ff" />
      </button>
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
  );
}
