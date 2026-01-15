'use client';
import Link from 'next/link';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center font-[duggeunmo]">
      <h1 className="text-[30px] font-bold text-red-500">Error</h1>
      <p className="mb-5 text-[20px] font-bold">
        알수없는 문제가 발생했습니다.
      </p>
      <div className="flex gap-3">
        <Link
          href={'/'}
          className="cursor-pointer rounded-lg bg-blue-400 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          홈페이지
        </Link>
        <button
          onClick={reset}
          className="cursor-pointer rounded-lg bg-blue-400 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          다시시도
        </button>
      </div>
    </div>
  );
}
