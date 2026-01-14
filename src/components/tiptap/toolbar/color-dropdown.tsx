import { useMemo, useRef } from 'react';

import useOnClickOutside from '@/hooks/useOnCilckOutside';

import Portal from '@/components/common/portal';

interface Props {
  colors: string[];
  targetRect: DOMRect | null;
  active: boolean;
  openDropdownRef: React.RefObject<HTMLButtonElement | null>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (color: string | null) => void;
}

export default function ColorDropdown({
  colors,
  targetRect,
  active,
  openDropdownRef,
  onSelect,
  setActive
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, (event: MouseEvent) => {
    if (openDropdownRef.current?.contains(event.target as Node)) return;

    setActive(false);
  });

  const pos = useMemo(() => {
    if (!targetRect) return null;

    const x = targetRect.left + window.scrollX - 6;
    const y = targetRect.bottom + window.scrollY + 4;

    return { x, y };
  }, [targetRect]);

  if (!active || !pos) return null;

  return (
    <Portal>
      <div
        ref={ref}
        className="absolute grid grid-cols-6 gap-2
        w-[176px] p-2 bg-white border border-[#cccccc] 
        rounded-[5px] z-40"
        style={{
          left: pos.x,
          top: pos.y
        }}
      >
        {colors.map(color => (
          <button
            key={color}
            onClick={() => {
              onSelect(color);
              setActive(false);
            }}
            style={{ backgroundColor: color }}
            className="cursor-pointer w-5 h-5 rounded-full"
          />
        ))}
        <button
          onClick={() => {
            onSelect(null);
            setActive(false);
          }}
          className="cursor-pointer w-5 h-5 rounded-full 
            border-[3px] border-[rgb(204,204,204)] relative"
        >
          <div
            className="w-[16px] h-[2px] rotate-45 bg-[#cccccc]
              "
          />
        </button>
      </div>
    </Portal>
  );
}
