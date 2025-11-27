export async function getBoard() {
  const res = await fetch(`http://localhost:4050/board`, { cache: 'no-store' })
    .then(res => res.json())
    .then(res => res.data);

  return res;
}

export async function getPost(id: string) {
  const res = await fetch(`http://localhost:4050/post/${id}`, {
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

  const res = await fetch(`http://localhost:4050/post?${queryString}`, {
    next: {
      tags: [`posts`],
      revalidate: false
    }
  }).then(res => res.json());

  return res;
}
