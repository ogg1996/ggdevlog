import { useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnCilckOutside';

interface Props {
  nowColor?: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  size: number;
  title: string;
  colors: string[];
  onSelect: (color: string | null) => void;
}

export default function ColorDropdown({
  nowColor,
  colors,
  onSelect,
  icon: Icon,
  size,
  title
}: Props) {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(dropDownRef, () => {
    setOpen(false);
  });

  return (
    <div ref={dropDownRef} className="relative">
      <button
        className="w-[24px] h-[24px] cursor-pointer  
        flex justify-center items-center"
        onClick={() => setOpen(prev => !prev)}
        title={title}
      >
        <Icon size={size} color={nowColor ? nowColor : '#999999'} />
      </button>
      {open && (
        <div
          className="absolute top-full grid grid-cols-6 gap-2
          w-[176px] mt-1 p-2 bg-white border border-[rgb(204,204,204)] rounded-[5px] z-40"
        >
          {colors.map(color => (
            <button
              key={color}
              onClick={() => {
                onSelect(color);
                setOpen(false);
              }}
              style={{ backgroundColor: color }}
              className="cursor-pointer w-5 h-5 rounded-full"
            />
          ))}
          <button
            onClick={() => {
              onSelect(null);
              setOpen(false);
            }}
            className="cursor-pointer w-5 h-5 rounded-full 
            border-[3px] border-[rgb(204,204,204)] relative"
          >
            <div
              className="absolute left-1/2 top-1/2 w-[16px] h-[2px] bg-[rgb(204,204,204)]
              rotate-45 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
        </div>
      )}
    </div>
  );
}
