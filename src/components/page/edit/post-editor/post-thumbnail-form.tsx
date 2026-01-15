'use client';

import Image from 'next/image';

import Instance from '@/api/instance';

import addImage from '@/components/tiptap/utils/add-image';
import { Thumbnail } from '@/components/common/types/types';

interface Props {
  thumbnail: Thumbnail | null;
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail | null>>;
}

export default function PostThumbnailForm({ thumbnail, setThumbnail }: Props) {
  async function handleClickAddThumbnail() {
    try {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        const result = await addImage();

        if (result === null) return;
        if (typeof result === 'string') {
          alert(result);
          return;
        }

        setThumbnail({
          image_name: result.img_name,
          image_url: result.img_url
        });
      } else {
        alert('접근 권한이 없습니다.');
      }
    } catch {
      alert('서버 오류');
    }
  }

  async function handleClickRemoveThumbnail() {
    try {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );
      if (access) {
        setThumbnail(null);
      } else {
        alert('접근 권한이 없습니다.');
      }
    } catch {
      alert('서버 오류');
    }
  }

  if (thumbnail === null)
    return (
      <button
        className="relative flex justify-center items-center w-[142px] h-[142px] 
            border border-[#cccccc] rounded-[5px] cursor-pointer group overflow-hidden"
        onClick={handleClickAddThumbnail}
      >
        <p className="font-bold text-2xl text-[#cccccc]">썸네일</p>
        <Image
          className="absolute z-10 opacity-0 group-hover:opacity-100"
          src="/icon-plus.png"
          alt="background"
          width={96}
          height={96}
          priority
        />
        <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-60 transition" />
      </button>
    );

  return (
    <button
      className="px-1 relative flex justify-center items-center w-[142px] h-[142px] border
            border-[#cccccc] rounded-[5px] cursor-pointer group overflow-hidden"
      onClick={handleClickRemoveThumbnail}
    >
      <Image
        className="w-full h-full object-center object-cover
              z-10 opacity-100 group-hover:opacity-60"
        src={thumbnail.image_url}
        alt="썸네일 이미지"
        fill
        priority
      />
      <Image
        className="absolute z-10 opacity-0
              group-hover:opacity-100"
        src="/icon-minus.png"
        alt="background"
        width={96}
        height={96}
        priority
      />
      <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-60 transition" />
    </button>
  );
}
