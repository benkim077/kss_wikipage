import UpdateButton from "./update-button";
import { fetchAllWikis, fetchWikiDetail } from "@/api/database";

export const revalidate = 0;

export default async function Page({ params }: { params: { wiki: number } }) {
  const currentWikiNum = params.wiki;
  const wikiPromise = fetchWikiDetail(currentWikiNum);

  // wiki.body를 파싱해야함. 강의 목록 중 해당하는 문자열을 링크로 변환해야 함. 필요한 데이터는 title, id
  const wikisPromise = fetchAllWikis();

  const [wiki, wikis] = await Promise.all([wikiPromise, wikisPromise]);

  return (
    <>
      <UpdateButton id={wiki.id}>수정</UpdateButton>
      <h2 className="pb-4">
        제목: <strong>{wiki.title}</strong>
      </h2>
      <p>{wiki.body}</p>
    </>
  );
}
