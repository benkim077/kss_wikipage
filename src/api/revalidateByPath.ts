export default async function revalidateByPath(path: string) {
  const baseUrl = location.origin;
  const res = await fetch(`${baseUrl}/api/revalidate?path=${path}`, {
    method: "POST",
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("재검증 실패");

  return res.json();
}
