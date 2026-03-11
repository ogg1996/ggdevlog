'use client';

import { Toaster } from '@/components/ui/sonner';
import useAdminStore from '@/stores/adminStore';
import useBoardStore from '@/stores/boardStore';
import useModalStore from '@/stores/modalStore';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Modal = dynamic(() => import('@/components/layout/modal/modal'), {
  ssr: false
});

export default function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { boardList, fetchBoardList } = useBoardStore();
  const { adminState } = useAdminStore();
  const { modalState, setModalState } = useModalStore();

  useEffect(() => {
    async function handleKeyDown(e: KeyboardEvent) {
      if (modalState === 'login') return;
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key === '~') {
        if (!adminState) setModalState('login');
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
      <Modal />
      <Toaster position="top-center" duration={1500} />
      {children}
    </ThemeProvider>
  );
}
