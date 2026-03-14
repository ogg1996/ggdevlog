import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  SquarePlay,
  Strikethrough,
  TextQuote,
  Underline
} from 'lucide-react';

import Instance from '@/api/instance';

import uploadImage from '@/utils/upload-image';

import { ToolbarItem } from '@/tiptap/types';
import { toast } from 'sonner';

const textColors: string[] = [
  '#ef4444',
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#EC4899'
];

const bgColors: string[] = [
  '#eaB308',
  '#3b82f6',
  '#a855f7',
  '#ec4899',
  '#22c55e'
];

const headingToolbarItems: ToolbarItem[] = [
  {
    key: 'heading1',
    text: '제목1',
    icon: Heading1,
    action: editor => editor.chain().focus().toggleHeading({ level: 1 }).run()
  },
  {
    key: 'heading2',
    text: '제목2',
    icon: Heading2,
    action: editor => editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    key: 'heading3',
    text: '제목3',
    icon: Heading3,
    action: editor => editor.chain().focus().toggleHeading({ level: 3 }).run()
  }
];
const markToolbarItems: ToolbarItem[] = [
  {
    key: 'bold',
    text: '굵게',
    icon: Bold,
    action: editor => editor.chain().focus().toggleBold().run()
  },
  {
    key: 'italic',
    text: '기울게',
    icon: Italic,
    action: editor => editor.chain().focus().toggleItalic().run()
  },
  {
    key: 'strike',
    text: '취소선',
    icon: Strikethrough,
    action: editor => editor.chain().focus().toggleStrike().run()
  },
  {
    key: 'underline',
    text: '밑줄',
    icon: Underline,
    action: editor => editor.chain().focus().toggleUnderline().run()
  }
];
const blockToolbarItems: ToolbarItem[] = [
  {
    key: 'blockquote',
    text: '인용',
    icon: TextQuote,
    action: editor => editor.chain().focus().toggleBlockquote().run()
  },
  {
    key: 'bulletList',
    text: '글머리 기호 목록',
    icon: List,
    action: editor => editor.chain().focus().toggleBulletList().run()
  },
  {
    key: 'orderedList',
    text: '번호 매기기 목록',
    icon: ListOrdered,
    action: editor => editor.chain().focus().toggleOrderedList().run()
  }
];

const mediaToolbarItems: ToolbarItem[] = [
  {
    key: 'link',
    text: '링크',
    icon: Link,
    action: editor => {
      if (editor.isActive('link')) {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
      } else {
        if (editor.state.selection.empty) {
          toast.error('텍스트 영역을 지정해야 합니다.');
          return;
        }

        const input: string | null = prompt('Enter Link URL');
        if (input === null) return;

        const url = input.trim();

        const href = /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;

        editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
      }
    }
  },
  {
    key: 'image',
    text: '이미지',
    icon: Image,
    action: async editor => {
      toast.promise(
        async () => {
          const access = await Instance.get('/auth/accessCheck').then(
            res => res.data.success
          );
          if (!access) {
            throw new Error('권한 없음');
          }

          const result = await uploadImage();

          if (typeof result === 'string') {
            throw new Error(result);
          }

          editor.chain().focus().setImage({ src: result.img_url }).run();

          return '이미지 추가 성공';
        },
        {
          loading: '처리 중...',
          success: message => message,
          error: err => err.message ?? '서버 오류'
        }
      );
    }
  },
  {
    key: 'youtube',
    text: '유튜브',
    icon: SquarePlay,
    action: editor => {
      const input: string | null = prompt('Enter Youtube URL');
      if (input === null) return;

      const url = input.trim();

      const src = /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;

      editor.commands.setYoutubeVideo({ src });
    }
  }
];

export {
  bgColors,
  blockToolbarItems,
  headingToolbarItems,
  markToolbarItems,
  mediaToolbarItems,
  textColors
};
