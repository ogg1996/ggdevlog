import { getActivity } from '@/api/fetch';
import ActivityItem from '@/components/page/home/activity/activity-item';
import ActivityListWrapper from '@/components/page/home/activity/activity-list-wrapper';
import { Item } from '@/components/page/home/activity/types/types';

export default async function ActivityList() {
  const activity: Item[][] = await getActivity();

  return (
    <ActivityListWrapper>
      {activity.map((week, weekIndex) => (
        <div key={`week-${weekIndex}`} className="grid grid-rows-7">
          {week.map((day, dayIndex) => (
            <ActivityItem key={`week-${weekIndex}-day-${dayIndex}`} day={day} />
          ))}
        </div>
      ))}
    </ActivityListWrapper>
  );
}
