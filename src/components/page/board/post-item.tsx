import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import dayjs from '@/utils/dayjs';

interface Props {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  thumbnailUrl?: string;
}

export default function PostItem({
  id,
  title,
  description,
  createdAt,
  thumbnailUrl
}: Props) {
  const created = dayjs(createdAt).tz().format('YYYY. MM. DD');

  return (
    <Link
      className={clsx(
        'group mb-7 flex rounded-sm',
        'flex-col-reverse md:flex-row',
        'bg-gray-100 md:bg-transparent',
        'dark:bg-slate-800 dark:md:bg-transparent',
        'shadow-sm shadow-black/20 md:shadow-none dark:shadow-black/80',
        'transition-all duration-150',
        'hover:-translate-y-1 hover:shadow-lg md:hover:translate-y-0 md:hover:shadow-none'
      )}
      href={`/post/${id}`}
    >
      <div className="grow p-3 md:p-0">
        <h2
          className={clsx(
            'mb-1 md:mb-3',
            'line-clamp-1 text-[20px] font-bold',
            'underline-offset-6 md:group-hover:underline',
            'text-slate-700 dark:text-slate-300',
            'group-hover:text-slate-900 dark:group-hover:text-white'
          )}
        >
          {title}
        </h2>
        <p
          className={clsx(
            'mb-3 min-h-10.5 md:mb-5 md:min-h-16.5',
            'text-[14px] text-slate-600 dark:text-slate-400',
            'line-clamp-2 md:line-clamp-3'
          )}
        >
          {description}
        </p>
        <p
          className={clsx(
            'h-4.5 text-end text-[12px] md:text-start',
            'text-slate-600 dark:dark:text-slate-400'
          )}
        >
          {created}
        </p>
      </div>
      <div
        className={clsx(
          'relative shrink-0 overflow-hidden',
          'h-50 w-full md:ml-10 md:h-36.25 md:w-70',
          'rounded-t-sm md:rounded-sm'
        )}
      >
        {thumbnailUrl ? (
          <Image
            className="h-full w-full object-cover object-center"
            src={thumbnailUrl}
            alt="썸네일 이미지"
            sizes="720px"
            fill
          />
        ) : (
          <Image
            className="h-full w-full object-cover object-center"
            src="/post-thumbnail.webp"
            alt="썸네일 이미지"
            sizes="720px"
            fill
          />
        )}
      </div>
    </Link>
  );
}
