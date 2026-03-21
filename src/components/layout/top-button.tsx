'use client';

import scrollToTop from '@/utils/scroll-to-top';
import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';

export default function TopButton() {
  return (
    <button
      className={clsx(
        'fixed right-3 bottom-3 h-10 w-10 cursor-pointer',
        'flex items-center justify-center',
        'rounded-sm bg-white dark:bg-slate-900',
        'hover:bg-gray-300 dark:hover:bg-slate-700'
      )}
      onClick={() => scrollToTop('smooth')}
    >
      <ChevronUp size={28} color="#0099ff" />
    </button>
  );
}
