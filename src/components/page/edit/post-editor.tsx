'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Instance from '@/axios/instance';

import Image from 'next/image';
import QuillEditor from '@/components/common/quill-editor';

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
          const response = await Instance.post('/img', formData);

          const IMG_NAME = response.data.img_name;
          const IMG_URL = response.data.img_url;

          setThumbnail({ image_name: IMG_NAME, image_url: IMG_URL });
        } catch (error) {
          console.error('error: ', error);
        }
      }
    });
  }

  async function handleClickRemoveThumbnail() {
    try {
      await Instance.delete('/img', {
        data: [thumbnail?.image_name]
      });
      setThumbnail(null);
    } catch (error) {
      console.error('error: ', error);
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
        }

        initializeState();
        router.push(`/post/${res.data.post_id}`);
      } catch (error) {
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
        router.back();
      } catch (error) {
        console.error('error: ', error);
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
                className="w-full max-h-[169px] p-1 bg-white absolute 
                border border-[rgb(204,204,204)] border-t-0
                rounded-[0_0_5px_5px] overflow-y-auto"
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
              src="/icon-plus.png"
              alt="background"
              width={96}
              height={96}
              className="absolute z-10 opacity-0 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-60 transition"></div>
          </button>
        ) : (
          <button
            className="px-1 relative flex justify-center items-center w-[142px] h-[142px] border
               border-[rgb(204,204,204)] rounded-[5px] cursor-pointer group overflow-hidden"
            onClick={handleClickRemoveThumbnail}
          >
            <img
              src={thumbnail.image_url}
              alt="thumbnail"
              className="w-[100%] relative z-10 opacity-100 group-hover:opacity-60"
            />
            <Image
              src="/icon-minus.png"
              alt="background"
              width={96}
              height={96}
              className="absolute z-10 opacity-0 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-60 transition"></div>
          </button>
        )}
      </div>
      <QuillEditor
        content={content}
        setContent={setContent}
        setTempImages={setTempImages}
      />
      <div className="flex justify-end mt-5 gap-2">
        {!post && (
          <button
            onClick={handleCancel}
            className="w-24 font-[duggeunmo] px-4 py-2 bg-red-400 text-white
              cursor-pointer rounded-lg hover:bg-red-500 transition"
          >
            작성취소
          </button>
        )}
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
