import CustomHeading from '@/tiptap/extentions/custom-heading';
import Image from '@tiptap/extension-image';
import {
  BackgroundColor,
  Color,
  TextStyle
} from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockShiki from 'tiptap-extension-code-block-shiki';

export const tiptapConfig = {
  extensions: [
    StarterKit.configure({
      codeBlock: false,
      heading: false,
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
    CustomHeading.configure({
      levels: [1, 2, 3]
    }),
    TextStyle,
    Color,
    BackgroundColor,
    Image,
    Youtube.configure({
      inline: false,
      nocookie: true,
      interfaceLanguage: 'kr'
    }),
    CodeBlockShiki.configure({
      defaultTheme: 'dark-plus',
      enableTabIndentation: true,
      tabSize: 2
    })
  ],
  immediatelyRender: false,
  editorProps: {
    attributes: {
      class: 'editor prose focus:outline-none max-w-none'
    }
  }
};
