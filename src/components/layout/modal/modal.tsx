'use client';

import BoardManagement from '@/components/layout/modal/board-management';
import Login from '@/components/layout/modal/login';
import Menubar from '@/components/layout/modal/menubar/menubar';
import useModalStore from '@/stores/modalStore';

export default function Modal() {
  const { modalState, setModalState } = useModalStore();
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
