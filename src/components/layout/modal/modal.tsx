'use client';

import Menubar from '@/components/layout/menubar/menubar';
import ModalBoardManagement from '@/components/layout/modal/modal-board-management';
import ModalLogin from '@/components/layout/modal/modal-login';
import useModalStore from '@/stores/modalStore';

export default function Modal() {
  const { modalState, setModalState } = useModalStore();
  return (
    <>
      {modalState && (
        <div
          className="fixed inset-0 z-60 h-full w-full bg-black/30"
          onClick={() => setModalState(null)}
        >
          {modalState === 'menubar' && <Menubar />}
          {modalState === 'login' && <ModalLogin />}
          {modalState === 'boardManagement' && <ModalBoardManagement />}
        </div>
      )}
    </>
  );
}
