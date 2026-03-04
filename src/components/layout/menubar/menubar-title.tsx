'use client';

import { Pencil, Settings } from 'lucide-react';

import useAdminStore from '@/stores/adminStore';
import useModalStore from '@/stores/modalStore';
import clsx from 'clsx';
import Link from 'next/link';

export default function MenubarTitle() {
  const { adminState } = useAdminStore();
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
              setModalState(null);
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
              setModalState(null);
            }}
          >
            <Settings size={24} color="#0099ff" />
          </button>
        </div>
      )}
    </div>
  );
}
