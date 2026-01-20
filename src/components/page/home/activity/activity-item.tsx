import { useRef, useState } from 'react';

import clsx from 'clsx';

import { Item } from '@/components/page/home/activity/types/types';

import Tooltip from '@/components/common/tooltip';

interface Props {
  day: Item;
}

export default function ActivityItem({ day }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const text = `<${day.date}> ${day.activityCount}회`;

  return (
    <>
      <div
        ref={ref}
        className="group relative flex h-6 w-6 items-center justify-center"
        onMouseEnter={() => {
          if (ref.current) setRect(ref.current.getBoundingClientRect());
          setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={clsx(
            'h-5 w-5 rounded-sm',
            day.activityCount > 2
              ? 'bg-blue-400'
              : day.activityCount > 0
                ? 'bg-blue-300'
                : 'bg-slate-600'
          )}
        />
      </div>
      <Tooltip text={text} visible={hover} targetRect={rect} />
    </>
  );
}
