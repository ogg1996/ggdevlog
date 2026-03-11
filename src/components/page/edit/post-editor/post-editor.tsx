'use client';

import { Board, Post, Thumbnail } from '@/components/common/types/types';
import { useEffect, useState } from 'react';

import Instance from '@/api/instance';
import { myUpdateTag } from '@/api/revalidate';
import PostActionButtons from '@/components/page/edit/post-editor/post-action-buttons';
import PostMetaForm from '@/components/page/edit/post-editor/post-meta-form';
import PostThumbnailForm from '@/components/page/edit/post-editor/post-thumbnail-form';
import { tiptapConfig } from '@/components/tiptap/config/tiptap-config';
import TiptapEditor from '@/components/tiptap/tiptap-editor';
import { extractImages } from '@/components/tiptap/utils/extract-images';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
  post?: Post;
}

export default function PostEditor({ post }: Props) {
  const router = useRouter();

  const editor = useEditor({
    ...tiptapConfig,
    content: post ? post.content : '<p></p>'
  });

  const [board, setBoard] = useState<Board>({ id: 1, name: 'ETC' });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<Thumbnail | null>(null);
  const [pending, setPending] = useState(false);

  // 수정 시 데이터 로드 로직
  useEffect(() => {
    if (post) {
      setBoard({ id: post.board.id, name: post.board.name });
      setTitle(post.title);
      setDescription(post.description);
      setThumbnail(post.thumbnail || null);
    }
  }, [post]);

  function validatePost(): string | null {
    if (!title.trim()) return '제목을 작성해야 합니다.';
    if (title.length > 25) return '제목은 25자 이내로 작성해야 합니다.';
    if (!description.trim()) return '설명을 작성해야 합니다.';
    return null;
  }

  async function handleSave() {
    if (confirm('게시글 작성을 완료 하시겠습니까?')) {
      setPending(true);

      toast.promise(
        async () => {
          const access = await Instance.get('/auth/accessCheck').then(
            res => res.data.success
          );
          if (!access) {
            setPending(false);
            throw new Error('권한 없음');
          }

          const validateResult = validatePost();

          if (validateResult) {
            setPending(false);
            throw new Error(validateResult);
          }

          const content = editor.getJSON();
          const images: string[] = [];

          extractImages(content, images);

          const postData = {
            board_id: board.id,
            title,
            thumbnail,
            description,
            content,
            images
          };

          const res = post
            ? await Instance.put(`/post/${post.id}`, postData)
            : await Instance.post('/post', postData);

          if (!res.data.success) {
            setPending(false);
            throw new Error(res.data.message ?? '요청 실패');
          }

          if (post) {
            myUpdateTag(`post-${post.id}`);
          }

          await Instance.post('/activity');
          myUpdateTag('posts');
          myUpdateTag('activity');
          setPending(false);
          router.push(`/post/${res.data.data.post_id}`);

          return res.data.message ?? '요청 성공';
        },
        {
          loading: '처리 중...',
          success: message => message,
          error: err => err.message ?? '서버 오류'
        }
      );
    }
  }

  async function handleCancel() {
    if (
      confirm('작성 중인 내용이 전부 사라집니다.\n정말로 취소하시겠습니까?')
    ) {
      toast.success('취소되었습니다.');
      router.back();
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <PostMetaForm
          board={board}
          title={title}
          description={description}
          setBoard={setBoard}
          setTitle={setTitle}
          setDescription={setDescription}
        />
        <PostThumbnailForm thumbnail={thumbnail} setThumbnail={setThumbnail} />
      </div>
      <TiptapEditor editor={editor} />
      <PostActionButtons
        post={post}
        pending={pending}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
}
