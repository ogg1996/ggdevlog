import dayjs from '@/components/common/utils/dayjs';
import { Item } from '@/components/page/home/activity/types/types';

const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function getActivity() {
  const res = await fetch(`${api_url}/activity`, {
    next: {
      tags: ['activity'],
      revalidate: false
    }
  })
    .then(res => res.json())
    .then(res => res.data);

  const activityMap = Object.fromEntries(
    res.map((item: { date: string; count: number }) => [item.date, item.count])
  );

  const start = dayjs.tz('2026-01-26');
  const end = dayjs().tz();

  const resultArr: Item[][] = [];

  let weekIndex = 0;
  let dayIndex = 0;

  for (
    let i = start.clone();
    i.isBefore(end, 'day') || i.isSame(end, 'day');
    i = i.add(1, 'day')
  ) {
    if (dayIndex === 7) {
      weekIndex++;
      dayIndex = 0;
    }
    const dateStr = i.format('YYYY-MM-DD');
    const activityCount = activityMap[dateStr] || 0;

    if (!resultArr[weekIndex]) resultArr[weekIndex] = [];

    resultArr[weekIndex][dayIndex++] = {
      date: dateStr,
      activityCount
    };
  }

  return resultArr;
}

export async function getIntroduce() {
  const res = await fetch(`${api_url}/introduce`, {
    next: {
      tags: ['introduce'],
      revalidate: false
    }
  })
    .then(res => res.json())
    .then(res => res.data);
  return res.content;
}

export async function getBoard() {
  const res = await fetch(`${api_url}/board`)
    .then(res => res.json())
    .then(res => res.data);

  return res;
}

export async function getPost(id: string) {
  const res = await fetch(`${api_url}/post/${id}`, {
    next: {
      tags: [`post-${id}`],
      revalidate: false
    }
  })
    .then(res => res.json())
    .then(res => res.data);
  return res;
}

export async function getPosts(
  name: string = 'all',
  page: number = 1,
  limit: number = 5
) {
  const params = {
    board_name: name,
    page: String(page),
    limit: String(limit)
  };

  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(`${api_url}/post?${queryString}`, {
    next: {
      tags: [`posts`],
      revalidate: false
    }
  })
    .then(res => res.json())
    .then(res => res.data);

  return res;
}
