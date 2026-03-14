import { Editor } from '@tiptap/react';
import { LucideIcon } from 'lucide-react';

type ToolbarItem = {
  key: string;
  text: string;
  icon: LucideIcon;
  action: (editor: Editor) => void;
};

type EditorState = {
  active: {
    heading1: boolean;
    heading2: boolean;
    heading3: boolean;
    bold: boolean;
    italic: boolean;
    strike: boolean;
    underline: boolean;
    blockquote: boolean;
    bulletList: boolean;
    orderedList: boolean;
    link: boolean;
  };
  textStyle: {
    textColor: string;
    bgColor: string;
  };
};

type EditorKey = keyof EditorState['active'];

export { type EditorKey, type EditorState, type ToolbarItem };
