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
    <div className="flex justify-center font-bold text-slate-700 dark:text-slate-400">
      {totalPageGroup > 2 && nowPageGroup !== 1 && (
        <PageNavigationLink
          href={`/board/${boardName}/${1}`}
          text="<<"
          highlight={false}
        />
      )}
      {nowPageGroup !== 1 && (
        <PageNavigationLink
          href={`/board/${boardName}/${(nowPageGroup - 2) * PAGE_LIMIT + 1}`}
          text="<"
          highlight={false}
        />
      )}
      {Array.from({ length: nowPageGroupCount }).map((_, index) => {
        const page = nowPageGroupStartIndex + index;
        return (
          <PageNavigationLink
            key={`${boardName}-page-${page}`}
            href={`/board/${boardName}/${page}`}
            text={String(page)}
            highlight={nowPage === page}
          />
        );
      })}
      {nowPageGroup !== totalPageGroup && (
        <PageNavigationLink
          href={`/board/${boardName}/${nowPageGroup * PAGE_LIMIT + 1}`}
          text=">"
          highlight={false}
        />
      )}
      {totalPageGroup > 2 && nowPageGroup !== totalPageGroup && (
        <PageNavigationLink
          href={`/board/${boardName}/${(totalPageGroup - 1) * PAGE_LIMIT + 1}`}
          text=">>"
          highlight={false}
        />
      )}
    </div>
  );
}
