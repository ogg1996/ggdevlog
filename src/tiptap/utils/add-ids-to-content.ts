import { JSONContent } from '@tiptap/react';

export function addIdsToContent(content: JSONContent) {
  const result = {
    ...content,
    content: content.content?.map((item: JSONContent, index: number) => {
      if (item.type === 'heading') {
        const joinText =
          item.content
            ?.map(node => node.text ?? '')
            .join('')
            .trim() ?? 'heading';

        const text = `${index}-h${item.attrs?.level}-${joinText}`
          .toLowerCase()
          .replace(/[^a-zA-Z0-9\s가-힣-]/g, '')
          .replace(/\s+/g, '-');

        return {
          ...item,
          attrs: {
            ...item.attrs,
            id: text
          }
        };
      }
      return item;
    })
  };

  return result;
}
