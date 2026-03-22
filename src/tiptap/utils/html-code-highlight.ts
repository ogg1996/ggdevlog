import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus
} from '@shikijs/transformers';
import { addCopyButton } from 'shiki-transformer-copy-button';

import { fromHtml } from 'hast-util-from-html';
import { selectAll } from 'hast-util-select';
import { toHtml } from 'hast-util-to-html';
import { toString } from 'hast-util-to-string';
import { codeToHtml } from 'shiki';

import type { Element } from 'hast';

export async function htmlCodeHighlight(html: string): Promise<string> {
  const tree = fromHtml(html, { fragment: true });
  const pres = selectAll('pre', tree) as Element[];

  for (const pre of pres) {
    const code = pre.children?.find(
      (child): child is Element =>
        child.type === 'element' && child.tagName === 'code'
    );

    if (!code) continue;

    const classNames = (code.properties?.className ?? []) as string[];

    const languageClass =
      classNames.find((className: string) =>
        className.startsWith('language-')
      ) ?? 'language-tsx';

    const language = languageClass.replace('language-', '');

    const text = toString(code);

    const lines = text.split('\n');
    const headerLine = lines[0]?.trim();

    const headerMatch = headerLine?.match(/^\/\/\s*'([^']+)'$/);

    let fileName: string = '';
    let codeText: string = '';

    if (headerMatch) {
      fileName = headerMatch[1];
      codeText = lines.slice(1).join('\n');
    } else {
      codeText = text;
    }

    try {
      const highlightedHtml = await codeToHtml(codeText, {
        lang: language,
        theme: 'dark-plus',
        transformers: [
          transformerNotationDiff(),
          transformerNotationFocus(),
          transformerNotationErrorLevel(),
          addCopyButton({
            toggle: 3000
          }),
          {
            name: 'add-header',
            pre(node) {
              if (fileName) node.properties['data-file-name'] = fileName;
              node.properties['data-language'] = language;
            }
          }
        ]
      });

      const highlightedTree = fromHtml(highlightedHtml, { fragment: true });
      const newPre = highlightedTree.children.find(
        (child): child is Element =>
          child.type === 'element' && child.tagName === 'pre'
      );

      if (newPre && newPre.type === 'element') {
        pre.tagName = newPre.tagName;
        pre.properties = newPre.properties;
        pre.children = newPre.children;
      }
    } catch {
      // noop
    }
  }

  return toHtml(tree);
}
