'use client';

import BoardManagementModal from '@/components/layout/modal/board-management-modal';
import LoginModal from '@/components/layout/modal/login-modal';
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
      {modalState === 'login' && <LoginModal />}
      {modalState === 'boardManagement' && <BoardManagementModal />}
      {modalState && (
        <div
          className="fixed inset-0 z-49 h-full w-full bg-black/30"
          onClick={() => setModalState(null)}
        />
      )}
    </>
  );
}
