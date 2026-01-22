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
        className="object-cover object-center"
        fill
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-[duggeunmo] font-bold text-white">
        {children}
      </div>
    </div>
  );
}
