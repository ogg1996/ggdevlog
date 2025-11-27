'use client';

import { getBoard } from '@/api/fetch';
import Instance from '@/api/instance';
import { myRevalidateTag } from '@/api/revalidate';
import useModalStore from '@/stores/modalStore';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type board = { id: number; name: string };
type boardList = board[];

export default function ModalBoardManagement() {
  const { setModalState } = useModalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState<board | null>(null);
  const [input, setInput] = useState('');
  const [boardList, setBoardList] = useState<boardList | null>(null);

  async function getMenubarBoardList() {
    const data = await getBoard();

    const filterdData = data.filter((item: board) => item.id !== 1);
    setBoardList(filterdData);
  }

  useEffect(() => {
    async function init() {
      const res = await Instance.get('/accessCheck', {
        withCredentials: true
      });

      if (res.data.success) {
        getMenubarBoardList();
        setVisible(true);
      } else {
        alert(res.data.message);
        setModalState(null);
      }
    }

    init();
  }, []);

  useLayoutEffect(() => {
    if (visible) inputRef.current?.focus();
  }, [visible]);

  async function addBoard(name: string) {
    if (!input.trim()) {
      alert('텍스트를 입력해 주세요!');
      return;
    }
    try {
      const res = await Instance.post('/board', {
        name
      });
      if (res.data.success) {
        setInput('');
        getMenubarBoardList();
      }
      alert(res.data.message);
    } catch (error) {
      alert('서버 오류');
    }
  }

  async function updateBoard(id: number, name: string) {
    if (!input.trim()) {
      alert('텍스트를 입력해 주세요!');
      return;
    }
    try {
      const res = await Instance.put(`/board/${id}`, {
        name
      });
      if (res.data.success) {
        setInput('');
        setSelected(null);
        getMenubarBoardList();
      }
      alert(res.data.message);
    } catch (error) {
      alert('서버 오류');
    }
  }

  async function deleteBoard(id: number) {
    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        const res = await Instance.delete(`/board/${id}`);
        getMenubarBoardList();
        setSelected(null);
        alert(res.data.message);
      } catch (error) {
        alert('서버 오류');
      }
    }
  }

  if (visible)
    return (
      <div
        className="justify-self-center self-center bg-white
        w-[500px] h-[600px] rounded-[8px] p-4 flex flex-col
        gap-2 z-50"
      >
        <div className="w-full flex justify-between">
          <h2 className="text-[24px] font-bold">보드관리</h2>
          <button
            className="w-[36px] h-[36px] flex justify-center items-center
          cursor-pointer hover:bg-gray-200 hover:rounded-[5px]"
            onClick={() => {
              setModalState(null);
            }}
          >
            <Image
              src="/icon-close.png"
              alt="닫기 아이콘"
              width={36}
              height={36}
            />
          </button>
        </div>
        <ul
          className="w-full grow border-2 border-[#0099FF] 
          rounded-[5px]"
        >
          {boardList &&
            boardList.map(item => (
              <li key={`board_management_${item.name}`}>
                <button
                  className={`w-full h-full px-3 py-1 cursor-pointer 
                text-start text-[18px] text-[#0099FF] border-b nth-last-[n]:border-none
                ${selected?.id === item.id && 'bg-[#0099FF] text-white'}`}
                  onClick={() => {
                    if (selected?.id === item.id) {
                      setSelected(null);
                    } else {
                      setSelected(item);
                    }
                    setInput('');
                    inputRef.current?.focus();
                  }}
                >
                  {item.name}
                </button>
              </li>
            ))}
        </ul>
        <div className="w-full h-[30px] text-[20px] text-[#0099FF]">
          {selected && `Selected: ${selected.name}`}
        </div>
        <div className="w-full flex gap-2">
          <input
            className="grow p-2 font-bold disabled
            border border-[rgb(204,204,204)] rounded-[5px]"
            type="text"
            inputMode="text"
            ref={inputRef}
            value={input}
            placeholder="영문자만 입력할 수 있습니다.."
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (selected === null) {
                  addBoard(input);
                } else {
                  updateBoard(selected.id, input);
                }
              }
            }}
            onChange={e => {
              const input = e.target.value;
              const filtered = input.replace(/[^a-zA-Z]/g, '');
              setInput(filtered);
            }}
          />
          <div className="flex gap-1">
            {selected ? (
              <button
                className="w-16 font-[duggeunmo] px-4 py-2 bg-blue-400 text-white
                cursor-pointer rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  updateBoard(selected.id, input);
                }}
              >
                수정
              </button>
            ) : (
              <button
                className="w-16 font-[duggeunmo] px-4 py-2 bg-blue-400 text-white
                cursor-pointer rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  addBoard(input);
                }}
              >
                추가
              </button>
            )}

            {selected && (
              <button
                className="w-16 font-[duggeunmo] px-4 py-2 bg-red-400 text-white
                cursor-pointer rounded-lg hover:bg-red-500 transition"
                onClick={() => {
                  deleteBoard(selected.id);
                }}
              >
                삭제
              </button>
            )}
          </div>
        </div>
      </div>
    );
}
