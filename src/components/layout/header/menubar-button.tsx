'use client';

import clsx from 'clsx';
import { Menu } from 'lucide-react';

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
      <Menu size={36} color="#0099ff" />
    </button>
  );
}
