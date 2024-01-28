import Link from "next/link";
import { List as WikiList } from "@/components/List";
import CreateWikiModalSection from "./[page]/create-wiki-modal-section";
import { fetchWikis } from "@/api/database";

export const revalidate = 0;

export default async function IndexPage() {
  const currentPageNum = 0;
  const { wikis, isNextPage } = await fetchWikis(currentPageNum);

  const prevPageDisabled = currentPageNum === 0 ? true : false;
  const nextPageDisabled = !isNextPage;
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
      <footer className="flex gap-2">
        <Link
          href={prevPageDisabled ? "" : `${currentPageNum - 1}`}
          className={`font-normal ${
            prevPageDisabled
              ? "text-gray-400 bg-slate-200 border-gray-400 cursor-default"
              : "text-black border-black"
          } border  p-1 rounded no-underline`}
        >
          이전 페이지
        </Link>
        <Link
          href={nextPageDisabled ? "" : `${currentPageNum + 1}`}
          className={`font-normal ${
            nextPageDisabled
              ? "text-gray-400 bg-slate-200 border-gray-400 cursor-default"
              : "text-black border-black"
          } border  p-1 rounded no-underline`}
        >
          다음 페이지
        </Link>
      </footer>
    </>
  );
}
