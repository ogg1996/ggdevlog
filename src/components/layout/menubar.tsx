'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import { Pencil, Settings, X } from 'lucide-react';

import { getBoard } from '@/api/fetch';

import useAdminStore from '@/stores/adminStore';
import useMenubarStore from '@/stores/menubarStore';
import useModalStore from '@/stores/modalStore';

type boardList = { id: number; name: string }[];

export default function Menubar() {
  const { adminState } = useAdminStore();
  const { setModalState } = useModalStore();
  const { setActive } = useMenubarStore();

  const [boardList, setBoardList] = useState<boardList | null>(null);

  const pathName = usePathname();

  useEffect(() => {
    async function init() {
      const data = await getBoard();
      setBoardList(data);
    }

    init();
  }, []);

  return (
    <div
      className={clsx(
        'fixed z-50 min-h-screen',
        'flex flex-col gap-4 pr-2 pl-2',
        'text-[16px] font-bold text-[#0099ff]',
        'bg-white dark:bg-slate-900'
      )}
    >
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
      <div className="flex justify-between">
        <div className="text-[24px]">Board</div>
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
      <ul>
        {boardList &&
          boardList.map(item => (
            <li className="h-10" key={`menu_board_${item.name}`}>
              <Link
                className={clsx(
                  'block h-full w-full cursor-pointer',
                  'text-center text-[18px] leading-10',
                  pathName.includes(`/board/${item.name}/`)
                    ? 'bg-[#0099ff] text-white'
                    : 'hover:bg-gray-200'
                )}
                href={`/board/${item.name}/1`}
                onClick={() => {
                  setActive(false);
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
