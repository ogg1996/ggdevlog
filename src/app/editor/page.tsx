/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

import axios from 'axios';

import Viewer from '@/components/viewer';
import Image from 'next/image';
import QuillEditor from '@/components/quill-editor';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const [tempImages, setTempImages] = useState<string[]>([]);

  const [board, setBoard] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<{
    image_name: string;
    image_url: string;
  } | null>(null);
  const [content, setContent] = useState('');

  function initializeState() {
    setTempImages([]);
    setBoard('');
    setTitle('');
    setDescription('');
    setThumbnail(null);
    setContent('');
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setBoard(e.target.value);
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
          const response = await axios.post(
            'http://localhost:4050/img',
            formData
          );

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
      await axios.delete('http://localhost:4050/img', {
        data: [thumbnail?.image_name]
      });

      setThumbnail(null);
    } catch (error) {
      console.error('error: ', error);
    }
  }

  async function handleSave() {
    const images: string[] = [];

    for (const image of tempImages) {
      if (!content.includes(image)) {
        try {
          await axios.delete('http://localhost:4050/img', {
            data: [image]
          });
        } catch (error) {
          console.error('error: ', error);
        }
      } else {
        images.push(image);
      }
    }
    // 서버 저장 로직 추가
    console.log({ board, title, thumbnail, description, content, images });

    initializeState();
  }

  async function handleCancel() {
    try {
      if (thumbnail) {
        await axios.delete('http://localhost:4050/img', {
          data: [thumbnail?.image_name]
        });
        setThumbnail(null);
      }

      if (tempImages.length !== 0) {
        await axios.delete('http://localhost:4050/img', {
          data: tempImages
        });
      }
      initializeState();
      router.back();
    } catch (error) {
      console.error('error: ', error);
    }
  }

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <div>
        <div className="flex gap-2">
          <div className="grow mb-4 flex flex-col gap-2">
            <select
              className="p-2 border border-[rgb(204,204,204)] rounded-[5px]"
              onChange={handleSelect}
              value={board}
            >
              <option value="">카테고리</option>
              <option value="Javascript">Javascript</option>
              <option value="Typescript">Typescript</option>
              <option value="React">React</option>
              <option value="Next">Next</option>
              <option value="TroubleShooting">TroubleShooting</option>
            </select>
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
              placeholder="간단한 설명"
              className="w-full p-2 font-bold border
              border-[rgb(204,204,204)] rounded-[5px]"
            />
          </div>
          {thumbnail === null ? (
            <button
              className="flex justify-center items-center w-[141px] h-[141px] 
              border border-[rgb(204,204,204)] rounded-[5px] cursor-pointer"
              onClick={handleClickAddThumbnail}
            >
              <Image
                src="/icon-image.png"
                alt="thumbnail"
                width={96}
                height={96}
              />
            </button>
          ) : (
            <button
              className="w-[141px] h-[141px] border
              border-[rgb(204,204,204)] rounded-[5px] cursor-pointer"
              onClick={handleClickRemoveThumbnail}
            >
              <img src={thumbnail.image_url} alt="thumbnail" />
            </button>
          )}
        </div>
        <QuillEditor
          content={content}
          setContent={setContent}
          setTempImages={setTempImages}
        />
        <div className="flex justify-end mt-5 gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-400 text-white font-bold 
            cursor-pointer rounded-lg hover:bg-red-600 transition"
          >
            작성취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-400 text-white font-bold 
            cursor-pointer rounded-lg hover:bg-blue-600 transition"
          >
            작성완료
          </button>
        </div>
      </div>
      <div>
        <Viewer board={board} title={title} content={content} />
      </div>
    </div>
  );
}
