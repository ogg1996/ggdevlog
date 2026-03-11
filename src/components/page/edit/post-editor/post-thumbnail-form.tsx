'use client';
import Image from 'next/image';

import clsx from 'clsx';
import { CircleMinus, CirclePlus } from 'lucide-react';

import Instance from '@/api/instance';

import { Thumbnail } from '@/components/common/types/types';
import addImage from '@/components/tiptap/utils/add-image';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  thumbnail: Thumbnail | null;
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail | null>>;
}

const buttonStyle =
  'group relative flex h-35.5 w-35.5 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-slate-300';
const overlayIconStyle = 'absolute z-10 opacity-0 group-hover:opacity-100';
const overlayStyle = 'absolute inset-0 opacity-0 group-hover:opacity-60';

export default function PostThumbnailForm({ thumbnail, setThumbnail }: Props) {
  const [pending, setPending] = useState(false);

  async function handleClickAddThumbnail() {
    setPending(true);

    toast.promise(
      async () => {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );
        if (!access) {
          setPending(false);
          throw new Error('권한 없음');
        }

        const result = await addImage();

        if (typeof result === 'string') {
          setPending(false);
          throw new Error(result);
        }

        setThumbnail({
          image_name: result.img_name,
          image_url: result.img_url
        });
        setPending(false);

        return '썸네일 추가 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }

  async function handleClickRemoveThumbnail() {
    setPending(true);

    toast.promise(
      async () => {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );
        if (!access) {
          setPending(false);
          throw new Error('권한 없음');
        }

        setThumbnail(null);

        return '썸네일 삭제 성공';
      },
      {
        loading: '처리 중...',
        success: message => message,
        error: err => err.message ?? '서버 오류'
      }
    );
  }

  if (thumbnail === null)
    return (
      <button
        disabled={pending}
        className={buttonStyle}
        onClick={handleClickAddThumbnail}
      >
        <p className="text-2xl font-bold text-slate-300">썸네일</p>
        <CirclePlus size={96} color="#ffffff" className={overlayIconStyle} />
        <div className={clsx(overlayStyle, 'bg-green-500')} />
      </button>
    );

  return (
    <button
      disabled={pending}
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
