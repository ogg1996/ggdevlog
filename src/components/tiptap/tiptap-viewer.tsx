import '@/components/tiptap/styles/tiptap.css';

import { generateHTML } from '@tiptap/html';
import { JSONContent } from '@tiptap/react';

import { tiptapConfig } from '@/components/tiptap/config/tiptap-config';
import { htmlCodeHighlight } from '@/components/tiptap/utils/html-code-highlight';

interface Props {
  content: JSONContent;
}

export default function TiptapViewer({ content }: Props) {
  const html = generateHTML(content, tiptapConfig.extensions);

  return (
    <div
      className="tiptap prose max-w-none focus:outline-none"
      dangerouslySetInnerHTML={{ __html: htmlCodeHighlight(html) }}
    />
  );
}
