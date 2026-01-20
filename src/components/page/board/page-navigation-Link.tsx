import Link from 'next/link';

import clsx from 'clsx';

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
      className={clsx(
        'h-6 w-6 text-center',
        'hover:border-b-2',
        nowPage === page && 'text-slate-900 dark:text-white'
      )}
    >
      {page}
    </Link>
  );
}
