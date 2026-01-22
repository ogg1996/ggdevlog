'use client';
import Link from 'next/link';

import clsx from 'clsx';
import { Pencil, Settings } from 'lucide-react';

import useAdminStore from '@/stores/adminStore';
import useMenubarStore from '@/stores/menubarStore';
import useModalStore from '@/stores/modalStore';

export default function MenubarTitle() {
  const { adminState } = useAdminStore();
  const { setActive } = useMenubarStore();
  const { setModalState } = useModalStore();

  return (
    <div className="flex justify-between">
      <div className="text-[20px]">게시판</div>
      {adminState && (
        <div className="flex">
          <Link
            className={clsx(
              'h-9 w-9 cursor-pointer',
              'flex items-center justify-center',
              'hover:rounded-sm hover:bg-gray-200'
            )}
            href={'/edit'}
            onClick={() => {
              setActive(false);
            }}
          >
            <Pencil size={24} color="#0099ff" />
          </Link>
          <button
            className={clsx(
              'h-9 w-9 cursor-pointer',
              'flex items-center justify-center',
              'hover:rounded-sm hover:bg-gray-200'
            )}
            onClick={() => {
              setModalState('boardManagement');
              setActive(false);
            }}
          >
            <Settings size={24} color="#0099ff" />
          </button>
        </div>
      )}
    </div>
  );
}
