/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import 'react-quill-new/dist/quill.snow.css';

import React, { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import axios from 'axios';

import Viewer from '@/components/viewer';

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

export default function Page() {
  const quillRef = useRef<any>(false);

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }

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
          const result = await axios.post(
            'http://localhost:4050/img',
            formData
          );
          console.log('url: ', result.data.url);
          const IMG_URL = result.data.url;

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', IMG_URL);
        } catch (error) {
          console.error('error: ', error);
        }
      }
    });
  }

  function handleSave() {
    console.log({ title, content, category });

    // 서버 저장 로직 추가
  }

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <div>
        <div className="mb-4 flex gap-2">
          <select className="p-2" onChange={handleSelect} value={category}>
            <option value="">카테고리</option>
            <option value="Javascript">Javascript</option>
            <option value="Typescript">Typescript</option>
            <option value="React">React</option>
            <option value="Next">Next</option>
            <option value="TroubleShooting">TroubleShooting</option>
          </select>
          <input
            onChange={e => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="제목"
            className="w-full pl-2 font-bold border-none outline-none"
          />
        </div>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="내용"
        />
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            작성완료
          </button>
        </div>
      </div>
      <div>
        <Viewer category={category} title={title} content={content} />
      </div>
    </div>
  );
}
