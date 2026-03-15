'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Instance from '@/api/instance';
import { myUpdateTag } from '@/api/revalidate';
import { Confirm } from '@/components/common/confirm';
import useBoardStore from '@/stores/boardStore';
import useModalStore from '@/stores/modalStore';
import { Board } from '@/types/post';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export default function BoardManagementModal() {
  const { boardList, fetchBoardList } = useBoardStore();
  const { setModalState } = useModalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState<Board | null>(null);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function init() {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        setVisible(true);
      } else {
        toast.error('권한 없음');
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
      toast.error('텍스트를 입력해 주세요.');
      return;
    }

    setPending(true);

    toast.promise(
      async () => {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );
        if (!access) {
          setPending(false);
          throw new Error('권한 없음');
        }

        const res = await Instance.post('/board', {
          name
        });

        if (!res.data.success) {
          setPending(false);
          throw new Error(res.data.message ?? '요청 실패');
        }

        setInput('');
        fetchBoardList();
        setPending(false);

        return res.data.message ?? '요청 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }

  async function updateBoard(id: number, name: string) {
    if (!input.trim()) {
      toast.error('텍스트를 입력해 주세요.');
      return;
    }
    setPending(true);

    toast.promise(
      async () => {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );
        if (!access) {
          setPending(false);
          throw new Error('권한 없음');
        }

        const res = await Instance.put(`/board/${id}`, {
          name
        });

        if (!res.data.success) {
          setPending(false);
          throw new Error(res.data.message ?? '요청 실패');
        }

        setSelected(null);
        setInput('');
        fetchBoardList();
        setPending(false);

        return res.data.message ?? '요청 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }

  async function deleteBoard(id: number) {
    setPending(true);

    toast.promise(
      async () => {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );
        if (!access) {
          setPending(false);
          throw new Error('권한 없음');
        }

        const res = await Instance.delete(`/board/${id}`);

        if (!res.data.success) {
          setPending(false);
          throw new Error(res.data.message ?? '요청 실패');
        }

        setSelected(null);
        setInput('');
        fetchBoardList();
        myUpdateTag('posts');
        setPending(false);

        return res.data.message ?? '요청 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }

  if (visible)
    return (
      <div
        className={clsx(
          'fixed z-52 h-150 w-125 p-4',
          'top-25 left-1/2 -translate-x-1/2',
          'flex flex-col gap-2 rounded-lg',
          'overflow-y-hidden overscroll-none',
          'bg-white dark:bg-slate-900'
        )}
      >
        <div className="flex w-full justify-between">
          <h2 className="text-[24px] font-bold text-[#0099ff]">보드관리</h2>
          <button
            className={clsx(
              'h-9 w-9 cursor-pointer',
              'flex items-center justify-center',
              'hover:rounded-sm hover:bg-gray-200'
            )}
            onClick={() => {
              setModalState(null);
            }}
          >
            <X size={36} color="#0099ff" />
          </button>
        </div>
        <ul className="w-full grow rounded-sm border-2 border-[#0099ff]">
          {boardList?.map(
            item =>
              item.id !== 1 && (
                <li key={`board_management_${item.name}`}>
                  <button
                    className={clsx(
                      'h-full w-full cursor-pointer',
                      'px-3 py-1',
                      'text-start text-[18px] text-[#0099ff]',
                      'border-b nth-last-[n]:border-none',
                      selected?.id === item.id && 'bg-[#0099ff] text-white'
                    )}
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
              )
          )}
        </ul>
        <div className="h-7.5 w-full text-[20px] text-[#0099ff]">
          {selected && `Selected: ${selected.name}`}
        </div>
        <div className="flex w-full gap-2">
          <input
            className="grow rounded-sm border border-slate-300 p-2 font-bold"
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
          <div className="flex gap-1 font-[duggeunmo]">
            {selected ? (
              <button
                disabled={pending}
                className={clsx(
                  'w-16 cursor-pointer text-white',
                  'rounded-lg px-4 py-2',
                  'bg-blue-400 hover:bg-blue-600',
                  'disabled:bg-gray-400 disabled:hover:bg-gray-400'
                )}
                onClick={() => {
                  updateBoard(selected.id, input);
                }}
              >
                수정
              </button>
            ) : (
              <button
                disabled={pending}
                className={clsx(
                  'w-16 cursor-pointer text-white',
                  'rounded-lg px-4 py-2',
                  'bg-blue-400 hover:bg-blue-600',
                  'disabled:bg-gray-400 disabled:hover:bg-gray-400'
                )}
                onClick={() => {
                  addBoard(input);
                }}
              >
                추가
              </button>
            )}
            {selected && (
              <Confirm
                title="게시판 삭제"
                description="해당 게시판의 게시글은 [ETC]게시판으로 이동합니다."
                onClick={() => {
                  deleteBoard(selected.id);
                }}
              >
                <button
                  disabled={pending}
                  className={clsx(
                    'w-16 cursor-pointer text-white',
                    'rounded-lg px-4 py-2',
                    'bg-red-400 hover:bg-red-500',
                    'disabled:bg-gray-400 disabled:hover:bg-gray-400'
                  )}
                >
                  삭제
                </button>
              </Confirm>
            )}
          </div>
        </div>
      </div>
    );
}
