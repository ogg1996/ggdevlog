import ActivityList from '@/components/page/home/activity/activity-list';

export default function Activity() {
  return (
    <div>
      <div className="mb-5 rounded-sm bg-[#0099ff] px-2 py-1 font-[duggeunmo] text-[24px] font-bold text-white">
        Activity
      </div>
      <div className="mb-5 rounded-sm bg-slate-800 p-3.75">
        <div className="mb-3 flex gap-2">
          <div className="flex flex-col font-bold text-white">
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span>토</span>
            <span>일</span>
          </div>
          <ActivityList />
        </div>
        <div className="flex justify-end gap-1 font-bold text-slate-300">
          <span>Less</span>
          <span className="group relative flex h-6 w-6 items-center justify-center">
            <div className="h-5 w-5 rounded-sm bg-slate-600" />
          </span>
          <span className="group relative flex h-6 w-6 items-center justify-center">
            <div className="h-5 w-5 rounded-sm bg-blue-300" />
          </span>
          <span className="group relative flex h-6 w-6 items-center justify-center">
            <div className="h-5 w-5 rounded-sm bg-blue-400" />
          </span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
