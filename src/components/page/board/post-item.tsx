import Image from 'next/image';
import Link from 'next/link';

import dayjs from '@/components/common/utils/dayjs';

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
        <h2 className="mb-3 h-[30px] truncate text-[20px] font-bold text-[#555555] group-hover:text-[#000000] group-hover:underline">
          {title}
        </h2>
        <p className="mb-5 h-[63px] overflow-hidden text-[14px] text-ellipsis text-[#999999]">
          {description}
        </p>
        <p className="h-[18px] text-[12px] text-[#999999]">{created}</p>
      </div>
      <div className="relative ml-10 h-[145px] w-[120px] flex-shrink-0 overflow-hidden">
        {thumbnailUrl ? (
          <Image
            className="h-full w-full object-cover object-center"
            src={thumbnailUrl}
            alt="썸네일 이미지"
            fill
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#999999] font-bold text-white">
            No Thumbnail
          </div>
        )}
      </div>
    </Link>
  );
}
