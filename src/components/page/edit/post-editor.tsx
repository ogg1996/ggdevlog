'use client';
import React, { Suspense, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Instance from '@/api/instance';
import { myUpdateTag } from '@/api/revalidate';

const QuillEditor = dynamic(() => import('@/components/common/quill-editor'), {
  ssr: false
});

interface Board {
  id: number;
  name: string;
}

interface Props {
  boardList: { id: number; name: string }[];
  post?: {
    board: Board;
    id: number;
    title: string;
    description: string;
    thumbnail: {
      image_name: string;
      image_url: string;
    };
    content: string;
    images: string[];
    created_at: Date;
    updated_at: Date;
  };
}

export default function PostEditor({ boardList, post }: Props) {
  const router = useRouter();

  const [selectActive, setSelectActive] = useState(false);

  const [tempImages, setTempImages] = useState<string[]>([]);
  const [board, setBoard] = useState<Board>({ id: 1, name: 'Unspecified' });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<{
    image_name: string;
    image_url: string;
  } | null>(null);
  const [content, setContent] = useState('');

  // 수정시 데이터 로드 로직
  useEffect(() => {
    if (post) {
      setTempImages(post.images);
      setBoard({ id: post.board.id, name: post.board.name });
      setTitle(post.title);
      setDescription(post.description);
      setThumbnail(post.thumbnail);
      setContent(post.content);
    }
  }, [post]);

  function initializeState() {
    setTempImages([]);
    setBoard({ id: 1, name: 'Unspecified' });
    setTitle('');
    setDescription('');
    setThumbnail(null);
    setContent('');
  }

  async function handleClickAddThumbnail() {
    try {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
          if (input.files !== null) {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('img', file);

            try {
              const res = await Instance.post('/img', formData).then(
                res => res.data
              );

              const IMG_NAME = res.data.img_name;
              const IMG_URL = res.data.img_url;

              setThumbnail({ image_name: IMG_NAME, image_url: IMG_URL });
            } catch {
              alert('서버 오류');
            }
          }
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

  async function handleSave() {
    if (confirm('게시글 작성을 완료 하시겠습니까?')) {
      if (title.trim().length === 0 && 26 >= title.length) {
        alert('제목은 1 ~ 26자로 작성해야 합니다.');
        return;
      }
      if (description.trim().length === 0 && 50 >= description.length) {
        alert('설명은 1 ~ 50자로 작성해야 합니다.');
        return;
      }

      try {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );

        if (access) {
          const images: string[] = [];
          for (const image of tempImages) {
            if (!content.includes(image)) {
              await Instance.delete('/img', {
                data: [image]
              });
            } else {
              images.push(image);
            }
          }

          let res;

          // 게시글 추가
          if (!post) {
            res = await Instance.post('/post', {
              board_id: board.id,
              title,
              thumbnail,
              description,
              content,
              images
            });
            await Instance.post('/activity');
            // 게시글 수정
          } else {
            res = await Instance.put(`/post/${post.id}`, {
              board_id: board.id,
              title,
              thumbnail,
              description,
              content,
              images
            });
            myUpdateTag(`post-${post.id}`);
          }

          myUpdateTag('posts');
          initializeState();
          alert(res.data.message);
          router.push(`/post/${res.data.data.post_id}`);
        } else {
          alert('접근 권한이 없습니다.');
        }
      } catch {
        alert('작성 실패');
      }
    }
  }

  async function handleCancel() {
    if (
      confirm('작성 중인 내용이 전부 사라집니다.\n정말로 취소하시겠습니까?')
    ) {
      try {
        if (thumbnail) {
          await Instance.delete('/img', {
            data: [thumbnail?.image_name]
          });
          setThumbnail(null);
        }

        if (tempImages.length !== 0) {
          await Instance.delete('/img', {
            data: tempImages
          });
        }
        initializeState();
        alert('취소되었습니다.');
        router.back();
      } catch {
        alert('서버 오류');
      }
    }
  }

  return (
    <div className="neoDuggeun">
      <div className="flex gap-2 mb-4">
        <div className="grow flex flex-col gap-2">
          <div className="w-full relative">
            <button
              className={`w-full h-[42px] p-2
              border border-[rgb(204,204,204)] rounded-[5px]
              text-start flex items-center 
              ${selectActive && 'rounded-[5px_5px_0_0]'}`}
              onClick={() => {
                setSelectActive(!selectActive);
              }}
            >
              <span className="grow">{board.name}</span>
              <span className="text-[rgb(204,204,204)] text-[12px]">▼</span>
            </button>
            {selectActive && (
              <div
                className="w-full max-h-[137px] p-1 bg-white absolute 
                border border-[rgb(204,204,204)] border-t-0
                rounded-[0_0_5px_5px] overflow-y-auto z-40"
              >
                {boardList.map(item => (
                  <button
                    key={`board_${item.name}`}
                    className="w-full text-start p-1 hover:bg-gray-200"
                    onClick={() => {
                      setBoard({ id: item.id, name: item.name });
                      setSelectActive(false);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="제목"
            className="w-full p-2 font-bold border
              border-[rgb(204,204,204)] rounded-[5px]"
          />
          <input
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            type="text"
            placeholder="설명"
            className="w-full p-2 font-bold border
              border-[rgb(204,204,204)] rounded-[5px]"
          />
        </div>
        {thumbnail === null ? (
          <button
            className="relative flex justify-center items-center w-[142px] h-[142px] 
            border border-[rgb(204,204,204)] rounded-[5px] cursor-pointer group overflow-hidden"
            onClick={handleClickAddThumbnail}
          >
            <p className="font-bold text-2xl text-[rgb(204,204,204)]">썸네일</p>
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
        ) : (
          <button
            className="px-1 relative flex justify-center items-center w-[142px] h-[142px] border
            border-[rgb(204,204,204)] rounded-[5px] cursor-pointer group overflow-hidden"
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
        )}
      </div>
      <div className="min-h-[544px]">
        <Suspense fallback={<div>에이터 로딩중...</div>}>
          <QuillEditor
            content={content}
            setContent={setContent}
            setTempImages={setTempImages}
          />
        </Suspense>
      </div>
      <div className="flex justify-end mt-5 gap-2">
        <button
          onClick={handleCancel}
          className="w-24 font-[duggeunmo] px-4 py-2 bg-red-400 text-white
              cursor-pointer rounded-lg hover:bg-red-500 transition"
        >
          {!post ? '작성취소' : '수정취소'}
        </button>
        <button
          onClick={handleSave}
          className="w-24 font-[duggeunmo] px-4 py-2 bg-blue-400 text-white
            cursor-pointer rounded-lg hover:bg-blue-600 transition"
        >
          {!post ? '작성완료' : '수정완료'}
        </button>
      </div>
    </div>
  );
}
