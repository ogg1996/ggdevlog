import Activity from '@/components/page/home/activity';
import Introduce from '@/components/page/home/introduce';
import axios from 'axios';

async function getPosts(
  name: string = 'all',
  page: number = 1,
  limit: number = 5
) {
  const res = await axios.get('http://localhost:4050/post', {
    params: {
      board_name: name,
      page,
      limit
    }
  });

  return res.data;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Activity />
      <Introduce />
    </>
  );
}
