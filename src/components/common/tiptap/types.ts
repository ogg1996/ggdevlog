import { Editor } from '@tiptap/react';
import { LucideIcon } from 'lucide-react';

type ToolbarItem = {
  key: string;
  text: string;
  icon: LucideIcon;
  action: (
    editor: Editor,
    setTempImages?: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
};

type EditorState = {
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

type EditorKey = keyof EditorState;

export { type ToolbarItem, type EditorState, type EditorKey };
