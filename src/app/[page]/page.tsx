import Link from "next/link";
import { notFound } from "next/navigation";
import { List as WikiList } from "@/components/List";
import CreateWikiModalSection from "./create-wiki-modal-section";
import createDatabaseClient from "@/api/database";

export const revalidate = 0;

async function fetchWikis(pageNum: number) {
  const pageSize = 5;
  const pageIndex = pageNum;
  const db = createDatabaseClient();
  let { data: wikis, error } = await db
    .from("Page")
    .select("id, title")
    .order("id", { ascending: false })
    .range(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  if (error) throw error;
  // 여기서 null을 처리하면 JSX에서 처리할 필요가 없음
  if (wikis === null) throw new Error("Assertion: Pages is null");
  if (wikis.length === 0) notFound();
  // 페이지 당 위키 6개를 불러오고, 5개와 다음 페이지 존재 여부로 변환시킵니다.
  let isNextPage = false;
  if (wikis.length > 5) {
    isNextPage = true;
    wikis = wikis.slice(0, 5);
  }

  return { wikis, isNextPage };
}

export default async function IndexPage({
  params,
}: {
  params: { page: number };
}) {
  const currentPageNum = Number(params.page);
  const { wikis, isNextPage } = await fetchWikis(currentPageNum);

  return (
    <>
      <main>
        <CreateWikiModalSection />
        <WikiList>
          <WikiList.Items>
            {wikis.map((wiki) => {
              return (
                <WikiList.Item key={wiki.id}>
                  <Link href={`wiki/${wiki.id}`}>{wiki.title}</Link>
                </WikiList.Item>
              );
            })}
          </WikiList.Items>
        </WikiList>
      </main>
      <footer>
        {currentPageNum > 0 && (
          <Link
            href={`/${currentPageNum - 1}`}
            className="font-normal text-black border border-black p-1 rounded"
          >
            이전 페이지
          </Link>
        )}
        {isNextPage && (
          <Link
            href={`/${currentPageNum + 1}`}
            className="font-normal text-black border border-black p-1 rounded"
          >
            다음 페이지
          </Link>
        )}
      </footer>
    </>
  );
}
