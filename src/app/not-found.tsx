import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="font-[duggeunmo] h-[500px] flex flex-col items-center justify-center">
      <h1 className="text-[30px] font-bold text-red-500">404 Not Found</h1>
      <p className="text-[20px] font-bold mb-5">페이지를 찾을 수 없습니다.</p>
      <Link
        href={'/'}
        className="px-4 py-2 bg-blue-400 text-white
        cursor-pointer rounded-lg hover:bg-blue-600 transition"
      >
        홈페이지
      </Link>
    </div>
  );
}
