import { JSONContent } from '@tiptap/react';

export function extractImages(node: JSONContent, images: string[]) {
  if (node.type === 'image' && node.attrs?.src) {
    const imageName = node.attrs.src.split('/').pop();
    images.push(imageName);
  }

  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      extractImages(child, images);
    }
  }
}
