'use client';
import useModalStore from '@/stores/modalStore';
import clsx from 'clsx';

export default function Dimd({
  scrollLock,
  onClick
}: {
  scrollLock: boolean;
  onClick: () => void;
}) {
  const modalstate = useModalStore(state => state.modalState);
  return (
    <div
      className={clsx(
        'fixed inset-0 z-90',
        'h-full w-full bg-black/30',
        scrollLock && 'overflow-y-hidden overscroll-none',
        modalstate && 'z-110'
      )}
      onClick={onClick}
    />
  );
}
