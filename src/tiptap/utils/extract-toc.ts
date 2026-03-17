import { JSONContent } from '@tiptap/react';

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function extractToc(content: JSONContent): TocItem[] {
  const filteredContent = content.content?.filter(
    item => item.type === 'heading'
  );
  const result =
    filteredContent?.map(item => ({
      id: item.attrs?.id ?? '',
      text: item.content?.map(node => node.text ?? '').join('') ?? '',
      level: item.attrs?.level ?? 1
    })) ?? [];

  return result;
}
