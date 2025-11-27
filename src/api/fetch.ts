export async function getBoard() {
  const res = await fetch(`http://localhost:4050/board`, { cache: 'no-store' })
    .then(res => res.json())
    .then(res => res.data);

  return res;
}

export async function getPost(id: string) {
  const res = await fetch(`http://localhost:4050/post/${id}`, {
    next: {
      tags: [`post-${id}`]
    }
  })
    .then(res => res.json())
    .then(res => res.data);

  return res;
}
