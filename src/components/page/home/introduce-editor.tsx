'use client';
import { useEffect, useState } from 'react';

import Instance from '@/api/instance';
import QuillEditor from '@/components/common/quill-editor';

interface Props {
  originalContent: string;
  setOriginalContent: React.Dispatch<React.SetStateAction<string>>;
  originalImages: string[];
  setOriginalImages: React.Dispatch<React.SetStateAction<string[]>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IntroduceEditor({
  originalContent,
  setOriginalContent,
  originalImages,
  setOriginalImages,
  setEdit
}: Props) {
  const [tempImages, setTempImages] = useState<string[]>(originalImages);
  const [content, setContent] = useState(originalContent);

  useEffect(() => {
    async function init() {
      try {
        const access = await Instance.get('/auth/accessCheck').then(
          res => res.data.success
        );

        if (access) {
        } else {
          alert('접근 권한이 없습니다.');
          setEdit(false);
        }
      } catch {
        alert('서버 오류');
      }
    }

    init();
  }, []);

  async function handleSave() {
    try {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (access) {
        const images: string[] = [];
        if (tempImages.length !== 0) {
          const deleteImages: string[] = [];
          for (const image of tempImages) {
            if (!content.includes(image)) {
              deleteImages.push(image);
            } else {
              images.push(image);
            }
          }
          if (deleteImages.length !== 0) {
            await Instance.delete('/img', {
              data: deleteImages
            });
          }
        }
        const res = await Instance.put('/introduce', {
          content,
          images
        }).then(res => res.data);

        alert(res.message);
        setOriginalContent(res.data.content);
        setOriginalImages(res.data.images);
        setEdit(false);
      } else {
        alert('접근 권한이 없습니다.');
      }
    } catch {
      alert('서버 오류');
    }
  }

  async function handleCancel() {
    if (
      confirm('작성 중인 내용이 전부 사라집니다.\n정말로 취소하시겠습니까?')
    ) {
      try {
        if (tempImages.length !== 0) {
          const deleteImages: string[] = [];
          for (const image of tempImages) {
            if (!originalContent.includes(image)) {
              deleteImages.push(image);
            }
          }
          if (deleteImages.length !== 0) {
            await Instance.delete('/img', {
              data: deleteImages
            });
          }
        }
        setEdit(false);
        setContent(originalContent);
        alert('취소되었습니다.');
      } catch {
        alert('서버 오류');
      }
    }
  }

  return (
    <div>
      <QuillEditor
        content={content}
        setContent={setContent}
        setTempImages={setTempImages}
      />
      <div className="flex justify-end mt-5 gap-2">
        <button
          onClick={handleCancel}
          className="w-24 font-[duggeunmo] px-4 py-2 bg-red-400 text-white
              cursor-pointer rounded-lg hover:bg-red-500 transition"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="w-24 font-[duggeunmo] px-4 py-2 bg-blue-400 text-white
            cursor-pointer rounded-lg hover:bg-blue-600 transition"
        >
          완료
        </button>
      </div>
    </div>
  );
}
