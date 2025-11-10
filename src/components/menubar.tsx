'use client';

import Instance from '@/axios/instance';
import useAdminStore from '@/stores/adminStore';
import useMenubarStore from '@/stores/menubarStore';
import useModalStore from '@/stores/modalStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type boardList = { id: number; name: string }[];

export default function Menubar() {
  const { adminState } = useAdminStore();
  const { setModalState } = useModalStore();
  const { setActive } = useMenubarStore();

  const [boardList, setBoardList] = useState<boardList | null>(null);

  const pathName = usePathname();

  useEffect(() => {
    async function getBoard() {
      const res = await Instance.get('/board');
      setBoardList(res.data.data);
    }

    getBoard();
  }, []);

  return (
    <div
      className="pl-2 pr-2 min-h-[100vh] flex flex-col justify-self-start
      bg-white fixed z-50 text-[16px] font-bold text-[#0099FF] gap-4
      border-r-[2px] border-[#0099FF88]"
    >
      <div className="pr-6 flex items-center gap-2 h-[50px]">
        <button
          className="w-[44px] h-[44px] flex justify-center items-center
          cursor-pointer hover:bg-gray-200 hover:rounded-[5px]"
          onClick={() => {
            setActive(false);
          }}
        >
          <Image
            src="/icon-close.png"
            alt="닫기 아이콘"
            width={36}
            height={36}
          />
        </button>
        <Link className="h-[60px] flex items-center" href={'/'}>
          <Image src="/logo.png" alt="로고 아이콘" width={130} height={30} />
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="text-[24px]">Board</div>
        {adminState && (
          <div className="flex">
            <Link
              className="w-[36px] h-[36px] flex justify-center items-center
              cursor-pointer hover:bg-gray-200 hover:rounded-[5px]"
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
              />
            </Link>
            <button
              className={`w-[36px] h-[36px] flex justify-center items-center
              cursor-pointer hover:bg-gray-200 hover:rounded-[5px]`}
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
              />
            </button>
          </div>
        )}
      </div>
      <ul>
        {!boardList ? (
          <>
            <li className="h-[40px] flex items-center">
              <div className="block w-full h-[32px] bg-gray-200" />
            </li>
            <li className="h-[40px] flex items-center">
              <div className="block w-full h-[32px] bg-gray-200" />
            </li>
            <li className="h-[40px] flex items-center">
              <div className="block w-full h-[32px] bg-gray-200" />
            </li>
          </>
        ) : (
          boardList.map(item => (
            <li className="h-[40px]" key={`menu_board_${item.name}`}>
              <Link
                className={`block leading-[40px] text-[18px] text-center w-full h-full
                cursor-pointer ${
                  pathName.includes(`/board/${item.name}/`)
                    ? 'bg-[#0099FF] text-white'
                    : 'hover:bg-gray-200'
                } `}
                href={`/board/${item.name}/1`}
              >
                {item.name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
