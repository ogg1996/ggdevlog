import Instance from '@/axios/instance';
import Viewer from '@/components/viewer';

async function getPost(id: string) {
  const res = await Instance.get(`/post/${id}`);

  return res.data;
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <Viewer title={post.data.title} content={post.data.content} />
    </div>
  );
}
