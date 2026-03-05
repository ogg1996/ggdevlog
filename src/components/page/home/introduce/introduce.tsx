import { getIntroduce } from '@/api/fetch';
import IntroduceClient from '@/components/page/home/introduce/introduce-client';

export default async function Introduce() {
  const introduce = await getIntroduce();

  if (!introduce) return null;
  return <IntroduceClient introduce={introduce} />;
}
