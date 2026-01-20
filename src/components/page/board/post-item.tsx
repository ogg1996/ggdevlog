import Image from 'next/image';
import Link from 'next/link';

import dayjs from '@/components/common/utils/dayjs';
import clsx from 'clsx';

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
    <Link className="group mb-7 flex h-[145px]" href={`/post/${id}`}>
      <div className="min-w-0 grow">
        <h2
          className={clsx(
            'mb-3 h-[30px] truncate',
            'text-[20px] font-bold',
            'group-hover:underline',
            'text-slate-700 dark:text-slate-300',
            'group-hover:text-slate-900 dark:group-hover:text-white'
          )}
        >
          {title}
        </h2>
        <p
          className={clsx(
            'mb-5 h-[63px]',
            'overflow-hidden text-[14px] text-ellipsis',
            'text-slate-600 dark:dark:text-slate-400'
          )}
        >
          {description}
        </p>
        <p
          className={clsx(
            'h-[18px] text-[12px]',
            'text-slate-600 dark:dark:text-slate-400'
          )}
        >
          {created}
        </p>
      </div>
      <div className="relative ml-10 h-[145px] w-[120px] shrink-0 overflow-hidden">
        {thumbnailUrl ? (
          <Image
            className="h-full w-full object-cover object-center"
            src={thumbnailUrl}
            alt="썸네일 이미지"
            fill
            priority
          />
        ) : (
          <div
            className={clsx(
              'h-full w-full font-bold',
              'flex items-center justify-center',
              'bg-slate-200/50 dark:bg-slate-800',
              'text-slate-400 dark:text-slate-400'
            )}
          >
            No Thumbnail
          </div>
        )}
      </div>
    </Link>
  );
}
