import { notFound } from "next/navigation";
import createDatabaseClient from "@/api/database";

async function fetchWikiDetail(wikiNum: number) {
  const db = createDatabaseClient();
  const { data: wiki, error } = await db
    .from("Page")
    .select("*")
    .eq("id", wikiNum)
    .limit(1)
    .single();
  // TODO: NOT_FOUND 로 에러처리 하긴 했는데, error.tsx는 왜 안됐을까?
  if (error) notFound();
  return wiki;
}

export default async function Page({ params }: { params: { wiki: number } }) {
  const currentWikiNum = params.wiki;
  const wiki = await fetchWikiDetail(currentWikiNum);
  return (
    <>
      {wiki && (
        <>
          <h1 className="pb-4">
            제목: <strong>{wiki.title}</strong>
          </h1>
          <p>{wiki.body}</p>
        </>
      )}
    </>
  );
}
