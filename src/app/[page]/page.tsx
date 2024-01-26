import Link from "next/link";
import { List as WikiList } from "@/components/List";
import CreateWikiModalSection from "./create-wiki-modal-section";
import { fetchWikis } from "@/api/database";

export const revalidate = 0;

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
