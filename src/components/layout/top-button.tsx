'use client';

import scrollToTop from '@/components/common/utils/scorll-to-top';
import { MoveUp } from 'lucide-react';

export default function TopButton() {
  return (
    <button
      className="fixed right-3 bottom-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border-2 border-[#0099ff]"
      onClick={() => scrollToTop('smooth')}
    >
      <MoveUp size={28} color="#0099ff" />
    </button>
  );
}
