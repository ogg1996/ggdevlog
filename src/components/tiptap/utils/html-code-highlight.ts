import { toHtml } from 'hast-util-to-html';
import { fromHtml } from 'hast-util-from-html';
import { selectAll } from 'hast-util-select';
import { all, createLowlight } from 'lowlight';

import html from 'highlight.js/lib/languages/xml';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('js', js);
lowlight.register('ts', ts);

export function htmlCodeHighlight(html: string): string {
  const tree = fromHtml(html, { fragment: true });

  const codeBlocks = selectAll('pre > code', tree);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  codeBlocks.forEach((code: any) => {
    console.log(code);
    const className = code.properties.className?.[0] || '';
    const match = className.match(/language-(\w+)/);
    const language = match?.[1];

    const text = code.children?.[0]?.value || '';

    try {
      const result = lowlight.highlight(language, text);
      code.children = result.children;
      code.properties.className = ['hljs', `language-${language}`];
    } catch {}
  });

  return toHtml(tree);
}
