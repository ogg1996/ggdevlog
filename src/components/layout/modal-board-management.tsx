'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Image from 'next/image';

import Instance from '@/api/instance';
import { getBoard } from '@/api/fetch';
import { myUpdateTag } from '@/api/revalidate';

import useModalStore from '@/stores/modalStore';

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
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        getMenubarBoardList();
        setVisible(true);
      } else {
        alert('접근권한이 없습니다.');
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
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        const res = await Instance.post('/board', {
          name
        });
        if (res.data.success) {
          setInput('');
          getMenubarBoardList();
        }
        alert(res.data.message);
        myUpdateTag('board');
      } else {
        alert('접근 권한이 없습니다.');
      }
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
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        const res = await Instance.put(`/board/${id}`, {
          name
        });

        if (res.data.success) {
          setInput('');
          setSelected(null);
          getMenubarBoardList();
        }
        alert(res.data.message);
        myUpdateTag('board');
      } else {
        alert('접근 권한이 없습니다.');
      }
    } catch (error) {
      alert('서버 오류');
    }
  }

  async function deleteBoard(id: number) {
    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );

        if (access) {
          const res = await Instance.delete(`/board/${id}`);
          getMenubarBoardList();
          setSelected(null);
          alert(res.data.message);
          myUpdateTag('board');
        } else {
          alert('접근 권한이 없습니다.');
        }
      } catch (error) {
        alert('서버 오류');
      }
    }
  }

  if (visible)
    return (
      <div className="z-50 flex h-[600px] w-[500px] flex-col gap-2 self-center justify-self-center rounded-[8px] bg-white p-4">
        <div className="flex w-full justify-between">
          <h2 className="text-[24px] font-bold">보드관리</h2>
          <button
            className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center hover:rounded-[5px] hover:bg-gray-200"
            onClick={() => {
              setModalState(null);
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
        </div>
        <ul className="w-full grow rounded-[5px] border-2 border-[#0099FF]">
          {boardList &&
            boardList.map(item => (
              <li key={`board_management_${item.name}`}>
                <button
                  className={`h-full w-full cursor-pointer border-b px-3 py-1 text-start text-[18px] text-[#0099FF] nth-last-[n]:border-none ${selected?.id === item.id && 'bg-[#0099FF] text-white'}`}
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
        <div className="h-[30px] w-full text-[20px] text-[#0099FF]">
          {selected && `Selected: ${selected.name}`}
        </div>
        <div className="flex w-full gap-2">
          <input
            className="disabled grow rounded-[5px] border border-[#cccccc] p-2 font-bold"
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
                className="w-16 cursor-pointer rounded-lg bg-blue-400 px-4 py-2 font-[duggeunmo] text-white transition hover:bg-blue-600"
                onClick={() => {
                  updateBoard(selected.id, input);
                }}
              >
                수정
              </button>
            ) : (
              <button
                className="w-16 cursor-pointer rounded-lg bg-blue-400 px-4 py-2 font-[duggeunmo] text-white transition hover:bg-blue-600"
                onClick={() => {
                  addBoard(input);
                }}
              >
                추가
              </button>
            )}

            {selected && (
              <button
                className="w-16 cursor-pointer rounded-lg bg-red-400 px-4 py-2 font-[duggeunmo] text-white transition hover:bg-red-500"
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
