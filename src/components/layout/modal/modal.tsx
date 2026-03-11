'use client';

import BoardManagement from '@/components/layout/modal/board-management';
import Login from '@/components/layout/modal/login';
import Menubar from '@/components/layout/modal/menubar/menubar';
import useModalStore from '@/stores/modalStore';
import { useEffect } from 'react';

export default function Modal() {
  const { modalState, setModalState } = useModalStore();

  useEffect(() => {
    const root = document.documentElement;
    if (modalState) {
      const w = window.innerWidth - root.clientWidth;
      root.style.overflow = 'hidden';
      root.style.paddingRight = `${w}px`;
    } else {
      root.style.overflow = '';
      root.style.paddingRight = '';
    }
  }, [modalState]);

  return (
    <>
      <Menubar />
      {modalState === 'login' && <Login />}
      {modalState === 'boardManagement' && <BoardManagement />}
      {modalState && (
        <div
          className="fixed inset-0 z-49 h-full w-full bg-black/30"
          onClick={() => setModalState(null)}
        />
      )}
    </>
  );
}
