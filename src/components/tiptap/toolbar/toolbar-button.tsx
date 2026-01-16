'use client';

import { useRef, useState } from 'react';

import Tooltip from '@/components/common/tooltip';

interface Props {
  title: string;
  isActive?: boolean;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  size: number;
  onClick: () => void;
}

export default function ToolbarButton({
  title,
  isActive,
  icon: Icon,
  size,
  onClick
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  return (
    <>
      <button
        ref={ref}
        className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center"
        onClick={onClick}
        onMouseEnter={() => {
          if (ref.current) setRect(ref.current.getBoundingClientRect());
          setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
      >
        <Icon size={size} color={isActive ? '#0099FF' : '#999999'} />
      </button>
      <Tooltip text={title} visible={hover} targetRect={rect} />
    </>
  );
}
