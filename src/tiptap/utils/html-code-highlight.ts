import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus
} from '@shikijs/transformers';
import { addCopyButton } from 'shiki-transformer-copy-button';

import { fromHtml } from 'hast-util-from-html';
import { selectAll } from 'hast-util-select';
import { toHtml } from 'hast-util-to-html';
import { codeToHtml } from 'shiki';

import type { Element, Text } from 'hast';

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
    const text =
      code.children
        ?.filter((child): child is Text => child.type === 'text')
        .map(child => child.value ?? '')
        .join('') ?? '';

    try {
      const highlightedHtml = await codeToHtml(text, {
        lang: language,
        theme: 'dark-plus',
        meta: { __raw: `fileType="${language.toUpperCase()}"` },
        transformers: [
          transformerNotationDiff(),
          transformerNotationFocus(),
          transformerNotationErrorLevel(),
          addCopyButton({
            toggle: 3000
          }),
          {
            name: 'add-file-type',
            pre(node) {
              const match =
                this.options.meta?.__raw?.match(/fileType="([^"]+)"/);

              if (match) {
                node.properties ??= {};
                node.properties['data-title'] = match[1];
              }
            }
          }
        ]
      });

      const highlightedTree = fromHtml(highlightedHtml, { fragment: true });
      const newPre = highlightedTree.children?.[0];

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
