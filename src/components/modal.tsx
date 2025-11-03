'use client';

import ModalBoardManagement from '@/components/modal-board-management';
import ModalLogin from '@/components/modal-login';
import ModalMenubar from '@/components/menubar';
import useModalStore from '@/stores/modalStore';

export default function Modal() {
  const { modalState, setModalState } = useModalStore();
  return (
    <>
      {modalState && (
        <div
          className="fixed w-full h-full bg-black/30 z-60 grid flex"
          onClick={() => {
            if (modalState === 'login' || modalState === 'boardManagement')
              return;
            setModalState(null);
          }}
          aria-hidden="true"
        >
          {modalState === 'login' && <ModalLogin />}
          {modalState === 'boardManagement' && <ModalBoardManagement />}
        </div>
      )}
    </>
  );
}
