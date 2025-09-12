/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import 'react-quill-new/dist/quill.snow.css';

import { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

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

  function handleClickAddImage() {
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

          setTempImages((prev: any) => [...prev, IMG_NAME]);

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', IMG_URL);
          editor.setSelection(range.index + 1);
        } catch (error) {
          console.error('error: ', error);
        }
      }
    });
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
