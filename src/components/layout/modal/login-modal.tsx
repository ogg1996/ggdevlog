'use client';

import { useEffect, useRef, useState } from 'react';

import Instance from '@/api/instance';
import useAdminStore from '@/stores/adminStore';
import useModalStore from '@/stores/modalStore';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginModal() {
  const { setAdminState } = useAdminStore();
  const { setModalState } = useModalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [passward, setPassward] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleLogin() {
    if (passward.length === 0) {
      inputRef.current?.focus();
      toast.error('비밀번호를 입력하세요.');
      return;
    }

    setPending(true);

    toast.promise(
      async () => {
        const res = await Instance.post('/auth/login', {
          pw: passward
        });

        if (!res.data.success) {
          inputRef.current?.focus();
          setPassward('');
          setPending(false);
          throw new Error(res.data.message);
        }

        setModalState(null);
        setAdminState(true);
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

  return (
    <div
      className={clsx(
        'fixed z-120 w-75 p-4',
        'top-25 left-1/2 -translate-x-1/2',
        'flex flex-col items-center rounded-lg',
        'overflow-y-hidden overscroll-none',
        'bg-white dark:bg-slate-900'
      )}
    >
      <div className="mb-4 flex w-full justify-between">
        <h2 className="text-[24px] font-bold text-[#0099ff]">로그인</h2>
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
      <div className="mb-8">
        <input
          value={passward}
          ref={inputRef}
          onChange={e => {
            setPassward(e.target.value);
          }}
          type="password"
          placeholder="비밀번호를 입력하세요.."
          className="w-full border-b p-2"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />
      </div>
      <div className="flex gap-4">
        <button
          disabled={pending}
          className={clsx(
            'w-20 cursor-pointer text-white',
            'rounded-lg px-4 py-1',
            'bg-blue-400 hover:bg-blue-600'
          )}
          onClick={handleLogin}
        >
          로그인
        </button>
        <button
          disabled={pending}
          className={clsx(
            'w-20 cursor-pointer text-white',
            'rounded-lg px-4 py-1',
            'bg-red-400 hover:bg-red-500'
          )}
          onClick={() => setModalState(null)}
        >
          취소
        </button>
      </div>
    </div>
  );
}
