'use client';

import Dimd from '@/components/layout/dimd';
import BoardManagementModal from '@/components/layout/modal/board-management-modal';
import LoginModal from '@/components/layout/modal/login-modal';
import useModalStore from '@/stores/modalStore';

export default function Modal() {
  const { modalState, setModalState } = useModalStore();

  return (
    <>
      {modalState === 'login' && <LoginModal />}
      {modalState === 'boardManagement' && <BoardManagementModal />}
      {modalState && (
        <Dimd
          scrollLock={true}
          onClick={() => {
            setModalState(null);
          }}
        />
      )}
    </>
  );
}
