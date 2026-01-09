'use client';

import { type Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { Baseline, Highlighter } from 'lucide-react';

import {
  ToolbarItem,
  headingToolbarItems,
  markToolbarItems,
  blockToolbarItems,
  mediaToolbarItems
} from '@/components/common/tiptap/const-toolbar';

import addImage from '@/utils/add-image';

import { EditorKey, EditorState } from '@/components/common/tiptap/types';
import ToolbarGroup from '@/components/common/tiptap/toolbar-group';
import ToolbarButton from '@/components/common/tiptap/toolbar-button';
import ToolbarLine from '@/components/common/tiptap/toolbar-line';

interface Props {
  editor: Editor | null;
  setTempImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TiptapToolbar({ editor, setTempImages }: Props) {
  const editorState: EditorState | null = useEditorState({
    editor,
    selector: snapshot => {
      const { editor } = snapshot;

      if (!editor) return null;

      return {
        heading1: editor.isActive('heading', { level: 1 }),
        heading2: editor.isActive('heading', { level: 2 }),
        heading3: editor.isActive('heading', { level: 3 }),
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        strike: editor.isActive('strike'),
        underline: editor.isActive('underline'),
        blockquote: editor.isActive('blockquote'),
        bulletList: editor.isActive('bulletList'),
        orderedList: editor.isActive('orderedList'),
        link: editor.isActive('link')
      };
    }
  });

  if (!editor || !editorState) return null;

  return (
    <div
      className="flex flex-wrap justify-center gap-2 
      pb-3 border-b border-[#cccccc] "
    >
      <ToolbarGroup>
        {headingToolbarItems.map(
          ({ key, text, icon: Icon, action }: ToolbarItem) => (
            <ToolbarButton
              key={key}
              title={text}
              isActive={editorState[key as EditorKey]}
              icon={Icon}
              size={24}
              onClick={() => {
                action(editor);
              }}
            />
          )
        )}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {markToolbarItems.map(
          ({ key, text, icon: Icon, action }: ToolbarItem) => (
            <ToolbarButton
              key={key}
              title={text}
              isActive={editorState[key as EditorKey]}
              icon={Icon}
              size={20}
              onClick={() => {
                action(editor);
              }}
            />
          )
        )}
        <button
          className="w-[24px] cursor-pointer  
          flex justify-center items-center"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Baseline size={20} color="#999999" />
        </button>
        <button
          className="w-[24px] cursor-pointer  
          flex justify-center items-center"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Highlighter size={20} color="#999999" />
        </button>
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {blockToolbarItems.map(
          ({ key, text, icon: Icon, action }: ToolbarItem) => (
            <ToolbarButton
              key={key}
              title={text}
              isActive={editorState[key as EditorKey]}
              icon={Icon}
              size={24}
              onClick={() => {
                action(editor);
              }}
            />
          )
        )}
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {mediaToolbarItems.map(
          ({ key, text, icon: Icon, action }: ToolbarItem) => (
            <ToolbarButton
              key={key}
              title={text}
              isActive={editorState[key as EditorKey]}
              icon={Icon}
              size={18}
              onClick={() => {
                if (key === 'image') {
                  action(editor, setTempImages);
                } else {
                  action(editor);
                }
              }}
            />
          )
        )}
      </ToolbarGroup>
    </div>
  );
}
