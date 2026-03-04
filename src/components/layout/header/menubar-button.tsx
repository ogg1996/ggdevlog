'use client';

import useModalStore from '@/stores/modalStore';
import clsx from 'clsx';
import { Menu } from 'lucide-react';

export default function MenubarButton() {
  const { setModalState } = useModalStore();

  return (
    <button
      className={clsx(
        'h-11 w-11 cursor-pointer',
        'flex items-center justify-center',
        'hover:rounded-sm hover:bg-gray-200'
      )}
      onClick={() => {
        setModalState('menubar');
      }}
    >
      <Menu size={36} color="#0099ff" />
    </button>
  );
}
