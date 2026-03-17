'use client';

import useBoardStore from '@/stores/boardStore';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenubarList({ onClick }: { onClick: () => void }) {
  const { boardList } = useBoardStore();
  const pathName = usePathname();

  return (
    <ul className="no-scrollbar mb-3 grow overflow-y-auto border-b-2 pt-1.5">
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
            onClick={onClick}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
