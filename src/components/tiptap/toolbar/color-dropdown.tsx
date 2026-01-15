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
        className="absolute z-40 grid w-[176px] grid-cols-6 gap-2 rounded-[5px] border border-[#cccccc] bg-white p-2"
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
            className="h-5 w-5 cursor-pointer rounded-full"
          />
        ))}
        <button
          onClick={() => {
            onSelect(null);
            setActive(false);
          }}
          className="relative h-5 w-5 cursor-pointer rounded-full border-[3px] border-[#cccccc]"
        >
          <div className="h-[2px] w-[16px] rotate-45 bg-[#cccccc]" />
        </button>
      </div>
    </Portal>
  );
}
