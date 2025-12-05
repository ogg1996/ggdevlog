/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import 'react-quill-new/dist/quill.snow.css';

import { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import Instance from '@/api/instance';

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setTempImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReactQuill = dynamic(
  async () => {
    const { default: RQ, Quill } = await import('react-quill-new');
    const { ImageResize } = await import('quill-image-resize-module-ts');

    Quill.register('modules/ImageResize', ImageResize);

    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false }
);

export default function QuillEditor({
  content,
  setContent,
  setTempImages
}: Props) {
  const quillRef = useRef<any>(false);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { header: '3' }],
          ['clean', 'bold', 'italic', 'strike', { color: [] }],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['image', 'link']
        ],
        handlers: {
          image: handleClickAddImage
        }
      },
      ImageResize: {
        modules: ['Resize', 'DisplaySize']
      }
    };
  }, []);

  const formats = [
    'header',
    'bold',
    'italic',
    'strike',
    'list',
    'blockquote',
    'code-block',
    'link',
    'image',
    'color',
    'background'
  ];

  async function handleClickAddImage() {
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

              setTempImages((prev: any) => [...prev, IMG_NAME]);

              const editor = quillRef.current.getEditor();
              const range = editor.getSelection();
              editor.insertEmbed(range.index, 'image', IMG_URL);
              editor.setSelection(range.index + 1);
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

  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="내용"
    />
  );
}
