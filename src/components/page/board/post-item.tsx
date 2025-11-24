import Image from 'next/image';
import Link from 'next/link';

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
  const createdAtToDate = new Date(createdAt);
  const year = createdAtToDate.getFullYear();
  const month = createdAtToDate.getMonth() + 1;
  const date = createdAtToDate.getDate();

  return (
    <Link className="h-[145px] mb-7 flex group" href={`/post/${id}`}>
      <div className="grow min-w-0 ">
        <h2
          className="h-[30px] mb-3 font-bold 
          text-[20px] text-[#555555] truncate
        group-hover:text-[#000000] group-hover:underline"
        >
          {title}
        </h2>
        <p
          className="h-[63px] mb-5 text-[14px] text-[#999999] 
          overflow-hidden text-ellipsis "
        >
          {description}
        </p>
        <p className="h-[18px] text-[12px] text-[#999999]">{`${year}. ${month}. ${date}`}</p>
      </div>
      <div
        className="ml-10 flex-shrink-0
        w-[120px] h-[145px] overflow-hidden"
      >
        {thumbnailUrl ? (
          <img
            className="w-full h-full object-center object-cover"
            src={thumbnailUrl}
            alt="썸네일 이미지"
          />
        ) : (
          <div
            className="w-full h-full flex justify-center items-center 
          bg-[#DDDDDD]"
          >
            <Image
              width={100}
              height={100}
              src={'/none-thumbnail.png'}
              alt="썸네일 이미지"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
