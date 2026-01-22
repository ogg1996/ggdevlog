'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import useBoardStore from '@/stores/boardStore';
import useMenubarStore from '@/stores/menubarStore';

export default function MenubarList() {
  const { boardList } = useBoardStore();
  const { setActive } = useMenubarStore();
  const pathName = usePathname();

  return (
    <ul>
      {boardList?.map(item => (
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
  );
}
