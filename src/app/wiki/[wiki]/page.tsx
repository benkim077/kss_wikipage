import Link from "next/link";
import UpdateButton from "./update-button";
import { fetchAllWikis, fetchWikiDetail } from "@/api/database";
import { createWikiMap, parseBody } from "./util";

export const revalidate = 0;

export default async function Page({ params }: { params: { wiki: number } }) {
  const currentWikiNum = params.wiki;
  const wikiPromise = fetchWikiDetail(currentWikiNum);

  const wikisPromise = fetchAllWikis();

  const [{ id, title, body }, AllWikiList] = await Promise.all([
    wikiPromise,
    wikisPromise,
  ]);
  const bodyWithLinks = generateWikiLinks();

  function generateWikiLinks() {
    const wikiMap = createWikiMap(AllWikiList);
    const parsed = parseBody(body, wikiMap);
    return parsed.map((item, idx) => {
      if (item !== title && wikiMap.has(item)) {
        return (
          <Link href={`/wiki/${wikiMap.get(item)}`} key={idx}>
            {item}
          </Link>
        );
      } else {
        return <span key={idx}>{item}</span>;
      }
    });
  }
  return (
    <>
      <nav className="flex gap-2">
        <UpdateButton id={id}>수정</UpdateButton>
        <Link
          href="/"
          className="font-normal text-black border border-black p-1 rounded no-underline"
        >
          목록
        </Link>
      </nav>
      <h2 className="pb-4">
        제목: <strong>{title}</strong>
      </h2>
      <p>{bodyWithLinks}</p>
    </>
  );
}
