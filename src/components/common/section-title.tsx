import Image from 'next/image';

interface Props {
  imageSrc: string;
  children: React.ReactNode;
}

export default function SectionTitle({ imageSrc, children }: Props) {
  return (
    <div className="relative mb-7 h-50">
      <Image
        src={imageSrc}
        alt="보드 페이지 썸네일"
        className="rounded-sm object-cover object-center"
        sizes="1600px"
        fill
      />
      <div className="font-duggeunmo absolute inset-0 z-10 flex items-center justify-center rounded-sm bg-black/60 font-bold text-white">
        {children}
      </div>
    </div>
  );
}
