import { useRef, useState } from 'react';

import Tooltip from '@/components/common/tooltip';

type ActivityItem = {
  date: string;
  activityCount: number;
};

interface Props {
  day: ActivityItem;
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
          className={`h-5 w-5 rounded-sm ${
            day.activityCount > 2
              ? 'bg-blue-400'
              : day.activityCount > 0
                ? 'bg-blue-300'
                : 'bg-gray-600'
          }`}
        />
      </div>
      <Tooltip text={text} visible={hover} targetRect={rect} />
    </>
  );
}
