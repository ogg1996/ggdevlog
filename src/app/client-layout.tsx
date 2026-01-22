'use client';
import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { ThemeProvider } from 'next-themes';

import Instance from '@/api/instance';

import useAdminStore from '@/stores/adminStore';
import useBoardStore from '@/stores/boardStore';
import useMenubarStore from '@/stores/menubarStore';
import useModalStore from '@/stores/modalStore';

const Modal = dynamic(() => import('@/components/layout/modal/modal'), {
  ssr: false
});
const Menubar = dynamic(() => import('@/components/layout/menubar/menubar'), {
  ssr: false
});

export default function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { boardList, fetchBoardList } = useBoardStore();
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
    if (!boardList) fetchBoardList();
  }, []);

  useEffect(() => {
    document.body.style.overflowY = modalState ? 'hidden' : 'auto';
  }, [modalState]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {isActive && <Menubar />}
      <Modal />
      {children}
    </ThemeProvider>
  );
}
