export async function getBoard() {
  const res = await fetch(`http://localhost:4050/board`, { cache: 'no-store' })
    .then(res => res.json())
    .then(res => res.data);

  return res;
}
