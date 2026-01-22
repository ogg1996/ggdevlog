'use client';
import Image from 'next/image';

import clsx from 'clsx';
import { CircleMinus, CirclePlus } from 'lucide-react';

import Instance from '@/api/instance';

import { Thumbnail } from '@/components/common/types/types';
import addImage from '@/components/tiptap/utils/add-image';

interface Props {
  thumbnail: Thumbnail | null;
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail | null>>;
}

const buttonStyle =
  'group relative flex h-35.5 w-35.5 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-slate-300';
const overlayIconStyle = 'absolute z-10 opacity-0 group-hover:opacity-100';
const overlayStyle = 'absolute inset-0 opacity-0 group-hover:opacity-60';

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
      <button className={buttonStyle} onClick={handleClickAddThumbnail}>
        <p className="text-2xl font-bold text-slate-300">썸네일</p>
        <CirclePlus size={96} color="#ffffff" className={overlayIconStyle} />
        <div className={clsx(overlayStyle, 'bg-green-500')} />
      </button>
    );

  return (
    <button
      className={clsx(buttonStyle, 'p-1')}
      onClick={handleClickRemoveThumbnail}
    >
      <Image
        className="h-full w-full object-cover object-center opacity-100 group-hover:opacity-60"
        src={thumbnail.image_url}
        alt="썸네일 이미지"
        sizes="142px"
        fill
      />
      <CircleMinus size={96} color="#ffffff" className={overlayIconStyle} />
      <div className={clsx(overlayStyle, 'bg-red-500')} />
    </button>
  );
}
