'use client';

import ModalBoardManagement from '@/components/layout/modal-board-management';
import ModalLogin from '@/components/layout/modal-login';
import useModalStore from '@/stores/modalStore';

export default function Modal() {
  const { modalState, setModalState } = useModalStore();
  return (
    <>
      {modalState && (
        <div
          className="fixed w-full h-full bg-black/30 z-60"
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
