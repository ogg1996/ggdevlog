'use client';

import '@/styles/tiptap.css';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

import TiptapToolbar from '@/components/common/tiptap/tiptap-toolbar';

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        link: {
          openOnClick: false,
          autolink: false,
          linkOnPaste: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          HTMLAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      }),
      Underline,
      Color,
      Highlight,
      Image,
      Youtube.configure({
        inline: false,
        nocookie: true,
        interfaceLanguage: 'kr'
      }),
      CodeBlockLowlight.configure({
        lowlight
      })
    ],
    content: '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none max-w-none'
      }
    }
  });

  if (!editor) return <div>에이터 로딩중...</div>;

  return (
    <div
      className="relative w-full p-2 h-[544px] overflow-y-auto
      border border-[rgb(204,204,204)] rounded-[5px] "
    >
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
