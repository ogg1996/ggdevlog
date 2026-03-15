import { getPost } from '@/api/fetch';
import Toc from '@/components/layout/toc';
import { addIdsToContent } from '@/tiptap/utils/add-ids-to-content';
import { extractToc } from '@/tiptap/utils/extract-toc';
import { Post } from '@/types/post';

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function Layout({ children, params }: Props) {
  const { id } = await params;
  const post: Post = await getPost(id);

  const contentWithHeadingIds = addIdsToContent(post.content);
  const toc = extractToc(contentWithHeadingIds);

  return (
    <>
      <Toc tocItems={toc} />
      {children}
    </>
  );
}
