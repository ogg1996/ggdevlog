'use client';
import Link from 'next/link';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="font-[duggeunmo] h-[500px] flex flex-col items-center justify-center">
      <h1 className="text-[30px] font-bold text-red-500">Error</h1>
      <p className="text-[20px] font-bold mb-5">
        알수없는 문제가 발생했습니다.
      </p>
      <div className="flex gap-3">
        <Link
          href={'/'}
          className="px-4 py-2 bg-blue-400 text-white
        cursor-pointer rounded-lg hover:bg-blue-600 transition"
        >
          홈페이지
        </Link>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-400 text-white
        cursor-pointer rounded-lg hover:bg-blue-600 transition"
        >
          다시시도
        </button>
      </div>
    </div>
  );
}
