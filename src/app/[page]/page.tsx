import { createClient } from "@supabase/supabase-js";
import { Database } from "@/interface/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { List } from "@/components/List";
import { ReactNode, useState } from "react";

async function fetchWikis(pageNum: number) {
  // url, key는 환경 변수로 빼야하지만 빼지 않겠다.
  const supabaseUrl = "https://mywzayzepbfaahgayxty.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3pheXplcGJmYWFoZ2F5eHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODA3MzcsImV4cCI6MjAyMTY1NjczN30.5dismLpTWMzMuTa7ra5tpAA83oOMV7fgktf06hJNf3w";
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  const pageSize = 5;
  const pageIndex = pageNum;
  let { data: wikis, error } = await supabase
    .from("Page")
    .select("id, title")
    // TODO: 최신 순으로 나오도록 수정
    .order("id", { ascending: true })
    // 1페이지 당 5개이지만 6개를 불러옵니다.
    // TODO: 5개와 boolean을 리턴하도록 할 수 있나?
    .limit(pageSize + 1)
    .gt("id", pageIndex * pageSize);
  if (error) throw error;
  // 여기서 null을 처리하면 JSX에서 처리할 필요가 없음
  if (wikis === null) throw new Error("Assertion: Pages is null");
  if (wikis.length === 0) notFound();

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
        <List>
          <List.Items>
            {wikis.map((wiki) => {
              return <List.Item key={wiki.id}>{wiki.title}</List.Item>;
            })}
          </List.Items>
        </List>
      </main>
      <footer>
        {currentPageNum > 0 && (
          <Link href={`/${currentPageNum - 1}`}>이전 페이지</Link>
        )}
        {isNextPage && <Link href={`/${currentPageNum + 1}`}>다음 페이지</Link>}
      </footer>
    </>
  );
}
