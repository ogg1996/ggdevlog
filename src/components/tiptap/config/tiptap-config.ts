import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  TextStyle,
  Color,
  BackgroundColor
} from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import html from 'highlight.js/lib/languages/xml';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('js', js);
lowlight.register('ts', ts);

export const tiptapConfig = {
  extensions: [
    StarterKit.configure({
      codeBlock: false,
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
      },
      bulletList: {
        keepMarks: true,
        keepAttributes: false
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false
      }
    }),
    Underline,
    TextStyle,
    Color,
    BackgroundColor,
    Image,
    Youtube.configure({
      inline: false,
      nocookie: true,
      interfaceLanguage: 'kr'
    }),
    CodeBlockLowlight.configure({
      lowlight,
      enableTabIndentation: true,
      tabSize: 2
    })
  ],
  content: '<p></p>',
  immediatelyRender: false,
  editorProps: {
    attributes: {
      class: 'editor prose focus:outline-none max-w-none'
    }
  }
};
