import { getPost } from '@/api/fetch';

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function Layout({ children, params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  // id를 추가하는 함수 (기존 JSONContent를 가공하는 형식으로)
  // toc를 추출하는 함수

  console.log(post);
  return <>{children}</>;
}
