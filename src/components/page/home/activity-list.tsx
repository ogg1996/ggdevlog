import { getActivity } from '@/api/fetch';
import ActivityItem from '@/components/page/home/activity-item';
import ActivityListWrapper from '@/components/page/home/activity-list-wrapper';
import { ActivityRecord } from '@/types/home';

export default async function ActivityList() {
  const activity: ActivityRecord[][] = await getActivity();

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
