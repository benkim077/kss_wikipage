import UpdateButton from "./update-button";
import { fetchWikiDetail } from "@/api/database";

export const revalidate = 0;

export default async function Page({ params }: { params: { wiki: number } }) {
  const currentWikiNum = params.wiki;
  const wiki = await fetchWikiDetail(currentWikiNum);
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
