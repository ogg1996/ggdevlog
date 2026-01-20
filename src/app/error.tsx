'use client';
import Link from 'next/link';

const buttonStyle =
  'cursor-pointer rounded-lg bg-blue-400 px-4 py-2 text-white hover:bg-blue-600';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-125 flex-col items-center justify-center font-[duggeunmo]">
      <h1 className="text-[30px] font-bold text-red-500">Error</h1>
      <p className="mb-5 text-[20px] font-bold">
        알수없는 문제가 발생했습니다.
      </p>
      <div className="flex gap-3">
        <Link href={'/'} className={buttonStyle}>
          홈페이지
        </Link>
        <button onClick={reset} className={buttonStyle}>
          다시시도
        </button>
      </div>
    </div>
  );
}
