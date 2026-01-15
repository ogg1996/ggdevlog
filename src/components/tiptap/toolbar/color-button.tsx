import { useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnCilckOutside';
import Tooltip from '@/components/common/tooltip';
import ColorDropdown from '@/components/tiptap/toolbar/color-dropdown';

interface Props {
  nowColor: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  size: number;
  title: string;
  colors: string[];
  onSelect: (color: string | null) => void;
}

export default function ColorButton({
  nowColor,
  colors,
  onSelect,
  icon: Icon,
  size,
  title
}: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  return (
    <>
      <button
        ref={ref}
        className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center"
        onClick={() => setActive(prev => !prev)}
        onMouseEnter={() => {
          if (ref.current) setRect(ref.current.getBoundingClientRect());
          setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
      >
        <Icon size={size} color={nowColor ? nowColor : '#999999'} />
      </button>
      <ColorDropdown
        colors={colors}
        targetRect={rect}
        active={active}
        openDropdownRef={ref}
        setActive={setActive}
        onSelect={onSelect}
      />
      <Tooltip text={title} visible={hover} targetRect={rect} />
    </>
  );
}
