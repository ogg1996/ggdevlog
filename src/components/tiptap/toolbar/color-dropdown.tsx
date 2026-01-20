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
        className="absolute z-40 grid w-44 grid-cols-6 gap-2 rounded-sm border border-slate-300 bg-white p-2"
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
          className="relative h-5 w-5 cursor-pointer rounded-full border-[3px] border-slate-300"
        >
          <div className="h-0.5 w-4 rotate-45 bg-slate-300" />
        </button>
      </div>
    </Portal>
  );
}
