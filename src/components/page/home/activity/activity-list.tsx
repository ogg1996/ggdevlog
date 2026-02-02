'use client';
import { useEffect, useRef, useState } from 'react';

import Instance from '@/api/instance';

import dayjs from '@/components/common/utils/dayjs';

import { Item } from '@/components/page/home/activity/types/types';

import ActivityItem from '@/components/page/home/activity/activity-item';

export default function ActivityList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activity, setActivity] = useState<Item[][]>([]);

  useEffect(() => {
    async function init() {
      const res = await Instance('/activity').then(res => res.data);
      const activityMap = Object.fromEntries(
        res.data.map((item: { date: string; count: number }) => [
          item.date,
          item.count
        ])
      );

      const start = dayjs.tz('2026-01-26');
      const end = dayjs();

      const resultArr: Item[][] = [];

      let weekIndex = 0;
      let dayIndex = 0;

      for (
        let i = start.clone();
        i.isBefore(end, 'day') || i.isSame(end, 'day');
        i = i.add(1, 'day')
      ) {
        if (dayIndex === 7) {
          weekIndex++;
          dayIndex = 0;
        }
        const dateStr = i.format('YYYY-MM-DD');
        const activityCount = activityMap[dateStr] || 0;

        if (!resultArr[weekIndex]) resultArr[weekIndex] = [];

        resultArr[weekIndex][dayIndex++] = {
          date: dateStr,
          activityCount
        };
      }

      setActivity(resultArr);
    }

    init();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollLeft = el.scrollWidth;
    }
  }, [activity]);

  return (
    <div className="flex max-w-150 overflow-x-auto" ref={scrollRef}>
      {activity.map((week, weekIndex) => (
        <div key={`week-${weekIndex}`} className="grid grid-rows-7">
          {week.map((day, dayIndex) => (
            <ActivityItem key={`week-${weekIndex}-day-${dayIndex}`} day={day} />
          ))}
        </div>
      ))}
    </div>
  );
}
