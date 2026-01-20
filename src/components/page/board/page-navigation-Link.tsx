import Link from 'next/link';

import clsx from 'clsx';

interface Props {
  href: string;
  highlight: boolean;
  text: string;
}

export default function PageNavigationLink({ href, text, highlight }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        'h-6 w-6 text-center',
        'hover:border-b-2',
        highlight && 'text-slate-900 dark:text-white'
      )}
    >
      {text}
    </Link>
  );
}
