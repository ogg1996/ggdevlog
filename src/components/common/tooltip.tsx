'use client';
import { useMemo } from 'react';

import clsx from 'clsx';

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
        className={clsx(
          'font-[pretendard]',
          'fixed px-2 py-1',
          'rounded-[5px] border-[#999999]',
          'text-center text-[14px] font-bold whitespace-nowrap',
          'border bg-white text-[#333333]',
          'dark:bg-slate-800 dark:text-white'
        )}
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
