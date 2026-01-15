'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useEditor } from '@tiptap/react';

import Instance from '@/api/instance';
import { myUpdateTag } from '@/api/revalidate';

import { Board, Post, Thumbnail } from '@/components/common/types/types';
import { tiptapConfig } from '@/components/tiptap/config/tiptap-config';
import { extractImages } from '@/components/tiptap/utils/extract-images';

import PostActionButtons from '@/components/page/edit/post-editor/post-action-buttons';
import PostMetaForm from '@/components/page/edit/post-editor/post-meta-form';
import PostThumbnailForm from '@/components/page/edit/post-editor/post-thumbnail-form';
import TiptapEditor from '@/components/tiptap/tiptap-editor';

interface Props {
  boardList: Board[];
  post?: Post;
}

export default function PostEditor({ boardList, post }: Props) {
  const router = useRouter();

  const editor = useEditor(tiptapConfig);

  const [board, setBoard] = useState<Board>({ id: 1, name: 'Unspecified' });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<Thumbnail | null>(null);

  // 수정시 데이터 로드 로직
  useEffect(() => {
    if (post) {
      setBoard({ id: post.board.id, name: post.board.name });
      setTitle(post.title);
      setDescription(post.description);
      setThumbnail(post.thumbnail || null);

      if (editor && post.content) {
        editor.commands.setContent(post.content);
      }
    }
  }, [post, editor]);

  function validatePost(): string | null {
    if (title.trim()) return '제목을 작성해야 합니다.';
    if (title.length > 25) return '제목은 25자 이내로 작성해야 합니다.';
    if (!description.trim()) return '설명을 작성해야 합니다.';
    return null;
  }

  async function handleSave() {
    try {
      const access = await Instance.get('/auth/accessCheck').then(
        res => res.data.success
      );

      if (!access) {
        alert('접근 권한이 없습니다.');
        return;
      }

      if (!confirm('게시글 작성을 완료 하시겠습니까?')) return;

      const validateResult = validatePost();

      if (validateResult) {
        alert(validatePost);
        return;
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

      if (post) {
        myUpdateTag(`post-${post.id}`);
      } else {
        await Instance.post('/activity');
      }

      myUpdateTag('posts');
      alert(res.data.message);
      router.push(`/post/${res.data.data.post_id}`);
    } catch {
      alert('작성 실패');
    }
  }

  async function handleCancel() {
    if (
      confirm('작성 중인 내용이 전부 사라집니다.\n정말로 취소하시겠습니까?')
    ) {
      alert('취소되었습니다.');
      router.back();
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <PostMetaForm
          boardList={boardList}
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
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
}
