import Link from 'next/link';

import PageNavigationLink from '@/components/page/board/page-navigation-Link';

interface Props {
  boardName: string;
  nowPage: number;
  totalPage: number;
}

export default function PageNavigationBox({
  boardName,
  nowPage,
  totalPage
}: Props) {
  // 페이지 그룹당 최대 페이지 개수
  const PAGE_LIMIT = 5;

  // 총 페이지 그룹 개수
  const totalPageGroup = Math.ceil(totalPage / PAGE_LIMIT);

  // 현재 페이지 그룹
  const nowPageGroup = Math.ceil(nowPage / PAGE_LIMIT);

  // 현재 페이지 그룹의 스타트 페이지
  const nowPageGroupStartIndex = (nowPageGroup - 1) * PAGE_LIMIT + 1;

  // 현재 페이지 그룹의 페이지 개수
  const nowPageGroupCount =
    nowPageGroup === totalPageGroup ? totalPage % PAGE_LIMIT : PAGE_LIMIT;

  return (
    <div className="flex justify-center text-[#999999] font-bold">
      {totalPageGroup > 2 && nowPageGroup !== 1 && (
        <Link
          href={`/board/${boardName}/${1}`}
          className="w-6 h-6 text-center 
          hover:border-b-2"
        >
          {'<<'}
        </Link>
      )}
      {nowPageGroup !== 1 && (
        <Link
          href={`/board/${boardName}/${(nowPageGroup - 2) * PAGE_LIMIT + 1}`}
          className="w-6 h-6 text-center 
          hover:border-b-2"
        >
          {'<'}
        </Link>
      )}
      {Array.from({ length: nowPageGroupCount }).map((_, index) => (
        <PageNavigationLink
          key={`${boardName}-page-${nowPageGroupStartIndex + index}`}
          boardName={boardName}
          nowPage={nowPage}
          page={nowPageGroupStartIndex + index}
        />
      ))}
      {nowPageGroup !== totalPageGroup && (
        <Link
          href={`/board/${boardName}/${nowPageGroup * PAGE_LIMIT + 1}`}
          className="w-6 h-6 text-center 
          hover:border-b-2"
        >
          {'>'}
        </Link>
      )}
      {totalPageGroup > 2 && nowPageGroup !== totalPageGroup && (
        <Link
          href={`/board/${boardName}/${(totalPageGroup - 1) * PAGE_LIMIT + 1}`}
          className="w-6 h-6 text-center 
          hover:border-b-2"
        >
          {'>>'}
        </Link>
      )}
    </div>
  );
}
