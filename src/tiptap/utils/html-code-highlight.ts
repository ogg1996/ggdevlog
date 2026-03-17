import Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';

import { fromHtml } from 'hast-util-from-html';
import { selectAll } from 'hast-util-select';
import { toHtml } from 'hast-util-to-html';

export function htmlCodeHighlight(html: string): string {
  const tree = fromHtml(html, { fragment: true });
  const codeBlocks = selectAll('pre > code', tree) as Array<{
    properties?: { className?: string[] };
    children?: Array<{ type: string; value?: string }>;
  }>;

  codeBlocks.forEach(code => {
    const classNames = code.properties?.className ?? [];
    const languageClass =
      classNames.find(className => className.startsWith('language-')) ??
      'language-tsx';

    const language = languageClass.replace('language-', '');
    const grammar = Prism.languages[language];

    if (!grammar) return;

    const text = code.children?.map(child => child.value ?? '').join('') ?? '';

    try {
      const highlightedHtml = Prism.highlight(text, grammar, language);
      const highlightedTree = fromHtml(highlightedHtml, { fragment: true });

      code.children = highlightedTree.children as typeof code.children;
      code.properties = {
        ...code.properties,
        className: ['language-' + language]
      };
    } catch {
      // noop
    }
  });

  return toHtml(tree);
}
