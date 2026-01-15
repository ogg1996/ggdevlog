'use client';
import { useMemo } from 'react';

import Portal from '@/components/common/portal';

interface Props {
  text: string;
  targetRect: DOMRect | null;
  visible: boolean | undefined;
}

export default function Tooltip({ text, targetRect, visible }: Props) {
  const pos = useMemo(() => {
    if (!targetRect) return null;

    let x = targetRect.left + targetRect.width / 2;
    const y = targetRect.top - 2;

    const estimatedWidth = text.length * 8 + 20;

    const screenWidth = window.innerWidth;

    if (x + estimatedWidth / 2 > screenWidth - 30) {
      x = screenWidth - estimatedWidth / 2 - 30;
    }

    if (x - estimatedWidth / 2 < 30) {
      x = estimatedWidth / 2 + 30;
    }

    return { x, y };
  }, [targetRect, text]);

  if (!visible || !pos) return null;

  return (
    <Portal>
      <div
        className="fixed rounded-[5px] border border-[#999999] bg-white px-2 py-1 text-center font-[pretendard] text-[14px] font-bold whitespace-nowrap text-[#333333]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translateX(-50%) translateY(-100%)'
        }}
      >
        {text}
      </div>
    </Portal>
  );
}
