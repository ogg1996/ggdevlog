'use client';
import useModalStore from '@/stores/modalStore';

import ModalBoardManagement from '@/components/layout/modal/modal-board-management';
import ModalLogin from '@/components/layout/modal/modal-login';

export default function Modal() {
  const { modalState, setModalState } = useModalStore();
  return (
    <>
      {modalState && (
        <div
          className="fixed inset-0 z-60 h-full w-full bg-black/30"
          onClick={() => setModalState(null)}
        >
          {modalState === 'login' && <ModalLogin />}
          {modalState === 'boardManagement' && <ModalBoardManagement />}
        </div>
      )}
    </>
  );
}
