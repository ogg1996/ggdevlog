'use client';
import { useEffect } from 'react';

import Instance from '@/api/instance';

import useAdminStore from '@/stores/adminStore';
import useMenubarStore from '@/stores/menubarStore';
import useModalStore from '@/stores/modalStore';

import Header from '@/components/layout/header';
import Menubar from '@/components/layout/menubar';
import Modal from '@/components/layout/modal';

export default function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { adminState, setAdminState } = useAdminStore();
  const { modalState, setModalState } = useModalStore();
  const { isActive } = useMenubarStore();

  useEffect(() => {
    async function handleKeyDown(e: KeyboardEvent) {
      if (modalState) return;
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key === '~') {
        if (adminState) {
          if (confirm('관리자 권한을 해제 하시겠습니까?')) {
            try {
              const res = await Instance.post('/auth/logout');

              if (res.data.success) {
                alert(res.data.message);
                setAdminState(false);
              }
            } catch {
              alert('서버 오류');
            }
          }
        } else {
          setModalState('login');
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [adminState, modalState]);

  useEffect(() => {
    if (modalState) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [modalState]);

  return (
    <div>
      {isActive && <Menubar />}
      <Header />
      <Modal />
      <main
        className={`font-[pretendard] max-w-[700px] mx-auto
        px-6 pt-15 py-6`}
      >
        {children}
      </main>
    </div>
  );
}
