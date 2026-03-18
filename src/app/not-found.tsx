import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="font-duggeunmo flex h-125 flex-col items-center justify-center">
      <h1 className="text-[30px] font-bold text-red-500">404 Not Found</h1>
      <p className="mb-5 text-[20px] font-bold">페이지를 찾을 수 없습니다.</p>
      <Link
        href={'/'}
        className="font-pretendard cursor-pointer rounded-lg bg-blue-400 px-4 py-2 text-white hover:bg-blue-600"
      >
        홈페이지
      </Link>
    </div>
  );
}
