'use client';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { X } from 'lucide-react';

import Instance from '@/api/instance';

import useAdminStore from '@/stores/adminStore';
import useModalStore from '@/stores/modalStore';

export default function ModalLogin() {
  const { setAdminState } = useAdminStore();
  const { setModalState } = useModalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [passward, setPassward] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleLogin() {
    if (passward.length === 0) {
      inputRef.current?.focus();
      setMessage('비밀번호를 입력하세요.');
      return;
    }
    try {
      const res = await Instance.post('/auth/login', {
        pw: passward
      });

      if (res.data.success) {
        alert(res.data.message);
        setModalState(null);
        setAdminState(true);
      } else {
        setMessage(res.data.message);
        inputRef.current?.focus();
        setPassward('');
      }
    } catch {
      setMessage('서버 오류');
    }
  }

  return (
    <div
      className={clsx(
        'self-center justify-self-center',
        'z-50 mt-15 h-62.5 w-75 p-4',
        'flex flex-col items-center justify-between gap-2',
        'rounded-lg bg-white',
        'dark:bg-slate-900'
      )}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <div className="flex w-full justify-between">
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
      <div>
        <input
          value={passward}
          ref={inputRef}
          onChange={e => {
            setPassward(e.target.value);
            setMessage('');
          }}
          type="password"
          placeholder="비밀번호를 입력하세요.."
          className="mb-1 w-full border-b p-2"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />
        <p className="h-6.75 text-center text-[16px] text-red-600">{message}</p>
      </div>
      <div className="flex gap-4">
        <button
          className={clsx(
            'w-20 cursor-pointer text-white',
            'rounded-lg px-4 py-2',
            'bg-blue-400 hover:bg-blue-600'
          )}
          onClick={handleLogin}
        >
          로그인
        </button>
        <button
          className={clsx(
            'w-20 cursor-pointer text-white',
            'rounded-lg px-4 py-2',
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
