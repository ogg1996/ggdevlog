import type { Editor } from '@tiptap/core';

interface Props {
  editor: Editor | null;
}

export default function TiptapToolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>
        Strike
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        Underline
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        ul
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        ol
      </button>
      <button
        onClick={() => {
          if (editor.isActive('link')) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
          } else {
            if (editor.state.selection.empty) {
              alert('텍스트 영역을 지정해야 합니다.');
              return;
            }

            const input: string | null = prompt('Enter Link URL');
            if (input === null) return;

            const url = input.trim();

            const href = /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;

            editor
              .chain()
              .focus()
              .extendMarkRange('link')
              .setLink({ href })
              .run();
          }
        }}
      >
        Link
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        Image
      </button>
      <button
        onClick={() => {
          if (editor.isActive('youtube')) {
            editor.chain().focus().deleteSelection().run();
          } else {
            const input: string | null = prompt('Enter Youtube URL');
            if (input === null) return;

            const url = input.trim();

            const src = /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;

            editor.commands.setYoutubeVideo({ src });
          }
        }}
      >
        Youtube
      </button>
    </div>
  );
}
