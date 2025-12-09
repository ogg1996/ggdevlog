'use client';

import Instance from '@/api/instance';
import ActivityItem from '@/components/page/home/activity-item';
import { useEffect, useRef, useState } from 'react';

type ActivityItem = {
  date: string;
  activityCount: number;
};

export default function ActivityList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activity, setActivity] = useState<ActivityItem[][]>([]);

  useEffect(() => {
    async function init() {
      const res = await Instance('/activity').then(res => res.data);
      const activityMap = Object.fromEntries(
        res.data.map((item: { date: string; count: number }) => [
          item.date,
          item.count
        ])
      );

      const start = new Date('2025-12-08');
      const end = new Date();

      const resultArr: ActivityItem[][] = [];

      let weekIndex = 0;
      let dayIndex = 0;

      for (const i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
        if (dayIndex === 7) {
          weekIndex++;
          dayIndex = 0;
        }
        const dateStr = i.toISOString().slice(0, 10);
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
    <div className="flex overflow-x-auto max-w-[600px]" ref={scrollRef}>
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
