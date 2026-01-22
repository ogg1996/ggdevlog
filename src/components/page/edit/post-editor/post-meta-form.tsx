'use client';
import { useRef, useState } from 'react';

import clsx from 'clsx';

import useOnClickOutside from '@/hooks/useOnCilckOutside';

import { Board } from '@/components/common/types/types';
import useBoardStore from '@/stores/boardStore';

interface Props {
  board: Board;
  title: string;
  description: string;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}
export default function PostMetaForm({
  board,
  title,
  description,
  setBoard,
  setTitle,
  setDescription
}: Props) {
  const { boardList } = useBoardStore();

  const boardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [selectActive, setSelectActive] = useState(false);

  useOnClickOutside(boardRef, () => {
    setSelectActive(false);
  });

  return (
    <div className="flex grow flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div ref={boardRef} className="relative">
          <button
            className={clsx(
              'h-10.5 w-full p-2 sm:w-37.5',
              'flex items-center',
              'rounded-sm border border-slate-300 text-start',
              selectActive && 'rounded-[5px_5px_0_0]'
            )}
            onClick={() => {
              setSelectActive(!selectActive);
            }}
          >
            <span className="grow">{board.name}</span>
            <span className="text-[12px] text-slate-300">▼</span>
          </button>
          {selectActive && (
            <div
              className={clsx(
                'absolute z-40 overflow-y-auto',
                'max-h-34.25 w-full p-1',
                'rounded-[0_0_5px_5px] border border-t-0 border-slate-300',
                'bg-white dark:bg-slate-900'
              )}
            >
              {boardList?.map(item => (
                <button
                  key={`board_${item.name}`}
                  className="w-full p-1 text-start hover:bg-slate-200 dark:hover:bg-slate-700"
                  onClick={() => {
                    setBoard({ id: item.id, name: item.name });
                    setSelectActive(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          ref={titleRef}
          defaultValue={title}
          onBlur={() => setTitle(titleRef.current?.value ?? '')}
          type="text"
          placeholder="제목"
          className="grow rounded-sm border border-slate-300 p-2 font-bold focus:outline-none"
        />
      </div>
      <textarea
        ref={descriptionRef}
        defaultValue={description}
        onBlur={() => setDescription(descriptionRef.current?.value ?? '')}
        placeholder="설명"
        className="h-10.5 w-full resize-none rounded-sm border border-slate-300 p-1 font-bold focus:outline-none sm:grow"
      />
    </div>
  );
}
