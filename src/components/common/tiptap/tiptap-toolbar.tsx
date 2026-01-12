'use client';

import { type Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { Baseline, Highlighter } from 'lucide-react';

import {
  headingToolbarItems,
  markToolbarItems,
  blockToolbarItems,
  mediaToolbarItems,
  textColors,
  bgColors
} from '@/components/common/tiptap/consts';

import {
  EditorKey,
  EditorState,
  ToolbarItem
} from '@/components/common/tiptap/types';
import ToolbarGroup from '@/components/common/tiptap/toolbar-group';
import ToolbarButton from '@/components/common/tiptap/toolbar-button';
import ToolbarLine from '@/components/common/tiptap/toolbar-line';
import ColorDropdown from '@/components/common/tiptap/color-dropdown';

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
        active: {
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
        },
        textStyle: {
          textColor: editor.getAttributes('textStyle').color,
          bgColor: editor.getAttributes('textStyle').backgroundColor
        }
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
              isActive={editorState.active[key as EditorKey]}
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
              isActive={editorState.active[key as EditorKey]}
              icon={Icon}
              size={20}
              onClick={() => {
                action(editor);
              }}
            />
          )
        )}
        <ColorDropdown
          nowColor={editorState.textStyle.textColor}
          colors={textColors}
          onSelect={color => {
            if (!color) {
              editor.chain().focus().unsetColor().run();
              return;
            }
            editor.chain().focus().setColor(color).run();
          }}
          icon={Baseline}
          size={20}
          title="텍스트 색상"
        />
        <ColorDropdown
          nowColor={editorState.textStyle.bgColor}
          colors={bgColors}
          onSelect={color => {
            if (!color) {
              editor.chain().focus().unsetBackgroundColor().run();
              return;
            }
            editor.chain().focus().setBackgroundColor(color).run();
          }}
          icon={Highlighter}
          size={20}
          title="백그라운드 색상"
        />
      </ToolbarGroup>
      <ToolbarLine />
      <ToolbarGroup>
        {blockToolbarItems.map(
          ({ key, text, icon: Icon, action }: ToolbarItem) => (
            <ToolbarButton
              key={key}
              title={text}
              isActive={editorState.active[key as EditorKey]}
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
              isActive={editorState.active[key as EditorKey]}
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
