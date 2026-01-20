'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

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
        'fixed z-50 min-h-[100vh] justify-self-start',
        'flex flex-col gap-4 pr-2 pl-2',
        'text-[16px] font-bold text-[#0099FF]',
        'bg-white',
        'dark:bg-slate-900'
      )}
    >
      <div className="flex h-[50px] items-center gap-2 pr-6">
        <button
          className={clsx(
            'h-[44px] w-[44px] cursor-pointer',
            'flex items-center justify-center',
            'hover:rounded-[5px] hover:bg-gray-200'
          )}
          onClick={() => {
            setActive(false);
          }}
        >
          <Image
            src="/icon-close.png"
            alt="닫기 아이콘"
            width={36}
            height={36}
            priority
          />
        </button>
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
      <div className="flex justify-between">
        <div className="text-[24px]">Board</div>
        {adminState && (
          <div className="flex">
            <Link
              className={clsx(
                'h-[36px] w-[36px] cursor-pointer',
                'flex items-center justify-center',
                'hover:rounded-[5px] hover:bg-gray-200'
              )}
              href={'/edit'}
              onClick={() => {
                setActive(false);
              }}
            >
              <Image
                src="/icon-edit.png"
                alt="글쓰기 아이콘"
                width={28}
                height={28}
                priority
              />
            </Link>
            <button
              className={clsx(
                'h-[36px] w-[36px] cursor-pointer',
                'flex items-center justify-center',
                'hover:rounded-[5px] hover:bg-gray-200'
              )}
              onClick={() => {
                setModalState('boardManagement');
                setActive(false);
              }}
            >
              <Image
                src="/icon-setting.png"
                alt="설정 아이콘"
                width={28}
                height={28}
                priority
              />
            </button>
          </div>
        )}
      </div>
      <ul>
        {boardList &&
          boardList.map(item => (
            <li className="h-[40px]" key={`menu_board_${item.name}`}>
              <Link
                className={clsx(
                  'block h-full w-full cursor-pointer',
                  'text-center text-[18px] leading-10',
                  pathName.includes(`/board/${item.name}/`)
                    ? 'bg-[#0099FF] text-white'
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
