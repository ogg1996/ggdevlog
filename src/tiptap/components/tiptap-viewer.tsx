import '@/tiptap/styles/code-highlight.css';
import '@/tiptap/styles/tiptap.css';

import { tiptapConfig } from '@/tiptap/config';
import { htmlCodeHighlight } from '@/tiptap/utils/html-code-highlight';
import { generateHTML } from '@tiptap/html';
import { JSONContent } from '@tiptap/react';

interface Props {
  content: JSONContent;
}

export default function TiptapViewer({ content }: Props) {
  const html = generateHTML(content, tiptapConfig.extensions);

  return (
    <div
      className="tiptap prose max-w-none select-text focus:outline-none"
      dangerouslySetInnerHTML={{ __html: htmlCodeHighlight(html) }}
    />
  );
}
