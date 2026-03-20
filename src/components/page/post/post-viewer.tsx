import '@/tiptap/styles/shiki.css';
import '@/tiptap/styles/tiptap.css';

import { tiptapConfig } from '@/tiptap/config';
import { htmlCodeHighlight } from '@/tiptap/utils/html-code-highlight';
import { generateHTML } from '@tiptap/html';
import { JSONContent } from '@tiptap/react';

interface Props {
  content: JSONContent;
}

export default async function PostViewer({ content }: Props) {
  const html = generateHTML(content, tiptapConfig.extensions);
  const highlightHtml = await htmlCodeHighlight(html);

  return (
    <div
      className="tiptap prose max-w-none select-text focus:outline-none"
      dangerouslySetInnerHTML={{ __html: highlightHtml }}
    />
  );
}
