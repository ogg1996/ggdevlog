import { updateTag } from 'next/cache';

export async function myUpdateTag(tag: string) {
  updateTag(tag);
}
