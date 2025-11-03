'use client';

import Instance from '@/axios/instance';
import useAdminStore from '@/stores/adminStore';
import useModalStore from '@/stores/modalStore';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ModalLogin() {
  const { login } = useAdminStore();
  const { setModalState } = useModalStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const [passward, setPassward] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleLogin() {
    try {
      const res = await Instance.get('/login', {
        params: {
          pw: passward
        }
      });

      if (res.data.success) {
        alert(res.data.message);
        login();
        setModalState(null);
      } else {
        alert(res.data.message);
        setPassward('');
      }
    } catch (error) {
      alert('서버 통신에 문제가 있습니다 다시 시도해 주세요.');
      setPassward('');
    }
  }

  return (
    <div
      className="bg-white w-[300px] h-[250px] self-center justify-self-center
      rounded-[8px] p-4 flex flex-col justify-between items-center gap-2"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <div className="w-full flex justify-between">
        <h2 className="text-[24px] font-bold">로그인</h2>
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
      <input
        value={passward}
        ref={inputRef}
        onChange={e => {
          setPassward(e.target.value);
        }}
        type="password"
        placeholder="비밀번호를 입력하세요.."
        className="w-full p-2 border-b"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleLogin();
          }
        }}
      />
      <div className="flex gap-4">
        <button
          className="w-20 px-4 py-2 bg-blue-400 text-white font-bold 
          cursor-pointer rounded-lg hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          로그인
        </button>
        <button
          className="w-20 px-4 py-2 bg-red-400 text-white font-bold 
            cursor-pointer rounded-lg hover:bg-red-500 transition"
          onClick={() => setModalState(null)}
        >
          취소
        </button>
      </div>
    </div>
  );
}
