import CustomHeading from '@/tiptap/extentions/custom-heading';
import Image from '@tiptap/extension-image';
import {
  BackgroundColor,
  Color,
  TextStyle
} from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';

export const tiptapConfig = {
  extensions: [
    StarterKit.configure({
      codeBlock: {
        enableTabIndentation: true,
        tabSize: 2
      },
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
    })
  ],
  immediatelyRender: false,
  editorProps: {
    attributes: {
      class: 'editor prose focus:outline-none max-w-none'
    }
  }
};
