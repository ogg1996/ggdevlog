import Link from 'next/link';

interface Props {
  boardName: string;
  nowPage: number;
  page: number;
}

export default function PageNavigationLink({
  boardName,
  nowPage,
  page
}: Props) {
  return (
    <Link
      href={`/board/${boardName}/${page}`}
      className={`w-6 h-6 text-center hover:border-b-2 ${
        nowPage === page && 'text-[#333333]'
      }`}
    >
      {page}
    </Link>
  );
}
