'use client';

import Image from 'next/image';

import Instance from '@/api/instance';

import { Thumbnail } from '@/components/common/types/types';
import addImage from '@/components/tiptap/utils/add-image';

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
        className="group relative flex h-[142px] w-[142px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] border border-[#cccccc]"
        onClick={handleClickAddThumbnail}
      >
        <p className="text-2xl font-bold text-[#cccccc]">썸네일</p>
        <Image
          className="absolute z-10 opacity-0 group-hover:opacity-100"
          src="/icon-plus.png"
          alt="background"
          width={96}
          height={96}
          priority
        />
        <div className="absolute inset-0 bg-green-500 opacity-0 transition group-hover:opacity-60" />
      </button>
    );

  return (
    <button
      className="group relative flex h-[142px] w-[142px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] border border-[#cccccc] px-1"
      onClick={handleClickRemoveThumbnail}
    >
      <Image
        className="z-10 h-full w-full object-cover object-center opacity-100 group-hover:opacity-60"
        src={thumbnail.image_url}
        alt="썸네일 이미지"
        fill
        priority
      />
      <Image
        className="absolute z-10 opacity-0 group-hover:opacity-100"
        src="/icon-minus.png"
        alt="background"
        width={96}
        height={96}
        priority
      />
      <div className="absolute inset-0 bg-red-500 opacity-0 transition group-hover:opacity-60" />
    </button>
  );
}
