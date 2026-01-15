'use client';

import { useRef, useState } from 'react';

import { Board } from '@/components/common/types/types';

interface Props {
  boardList: Board[];
  board: Board;
  title: string;
  description: string;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function PostMetaForm({
  boardList,
  board,
  title,
  description,
  setBoard,
  setTitle,
  setDescription
}: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [selectActive, setSelectActive] = useState(false);

  return (
    <div className="grow flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="relative">
          <button
            className={`w-[150px] h-[42px] p-2
            border border-[#cccccc] rounded-[5px]
            text-start flex items-center 
            ${selectActive && 'rounded-[5px_5px_0_0]'}`}
            onClick={() => {
              setSelectActive(!selectActive);
            }}
          >
            <span className="grow">{board.name}</span>
            <span className="text-[#cccccc] text-[12px]">▼</span>
          </button>
          {selectActive && (
            <div
              className="w-full max-h-[137px] p-1 bg-white absolute 
                    border border-[#cccccc] border-t-0
                    rounded-[0_0_5px_5px] overflow-y-auto z-40"
            >
              {boardList.map(item => (
                <button
                  key={`board_${item.name}`}
                  className="w-full text-start p-1 hover:bg-gray-200"
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
          className="grow p-2 font-bold border
              border-[#cccccc] rounded-[5px] focus:outline-none"
        />
      </div>
      <textarea
        ref={descriptionRef}
        defaultValue={description}
        onBlur={() => setDescription(descriptionRef.current?.value ?? '')}
        placeholder="설명"
        className="grow w-full p-2 font-bold border border-[#cccccc]
              rounded-[5px] resize-none focus:outline-none"
      />
    </div>
  );
}
