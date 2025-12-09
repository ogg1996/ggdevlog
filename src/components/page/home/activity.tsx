import ActivityList from '@/components/page/home/activity-list';

export default function Activity() {
  return (
    <div>
      <div
        className="bg-[#0099FF] px-2 py-1 mb-5 rounded-[4px]
        font-[duggeunmo] font-bold text-[24px] text-white"
      >
        Activity
      </div>
      <div
        className="mb-5 p-[15px] rounded-[4px]
        bg-gray-700"
      >
        <div className="flex gap-2 mb-3">
          <div
            className="flex flex-col 
            text-white font-bold"
          >
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
        <div
          className="flex justify-end gap-1 
          text-[#dddddd] font-bold"
        >
          <span>Less</span>
          <span className="relative w-6 h-6 flex justify-center items-center group">
            <div className="w-5 h-5 rounded-sm bg-gray-600" />
          </span>
          <span className="relative w-6 h-6 flex justify-center items-center group">
            <div className="w-5 h-5 rounded-sm bg-blue-300" />
          </span>
          <span className="relative w-6 h-6 flex justify-center items-center group">
            <div className="w-5 h-5 rounded-sm bg-blue-400" />
          </span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
