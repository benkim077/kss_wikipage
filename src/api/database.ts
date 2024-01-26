import { createClient } from "@supabase/supabase-js";
import { Database } from "@/interface/supabase";
import { notFound } from "next/navigation";

export default function createDatabaseClient() {
  // TODO: url, key는 원래 환경 변수로 빼야한다.
  // 제출용도로 남겨둬야하는지 결정해야 한다.
  const supabaseUrl = "https://mywzayzepbfaahgayxty.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3pheXplcGJmYWFoZ2F5eHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODA3MzcsImV4cCI6MjAyMTY1NjczN30.5dismLpTWMzMuTa7ra5tpAA83oOMV7fgktf06hJNf3w";
  return createClient<Database>(supabaseUrl, supabaseKey);
}

export async function fetchWikiDetail(wikiNum: number) {
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

interface UpdateParams {
  id: number;
  title: string;
  body: string;
}
export async function updateWiki({ id, title, body }: UpdateParams) {
  const db = createDatabaseClient();

  const p1 = db.from("Page").update({ title: title }).eq("id", id).select();
  const p2 = db.from("Page").update({ body: body }).eq("id", id).select();

  await Promise.all([p1, p2]);
}

export async function fetchWikis(pageNum: number) {
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
  if (wikis === null) throw new Error("Assertion: Wikis is not null");
  if (wikis.length === 0) notFound();
  // 페이지 당 위키 6개를 불러오고, 5개와 다음 페이지 존재 여부로 변환시킵니다.
  let isNextPage = false;
  if (wikis.length > 5) {
    isNextPage = true;
    wikis = wikis.slice(0, 5);
  }

  return { wikis, isNextPage };
}

export async function fetchAllWikis() {
  const db = createDatabaseClient();
  let { data: wikis, error } = await db.from("Page").select("id, title");
  if (error) throw error;
  if (wikis == null) throw new Error("Assertion: Wikis is not null");
  return wikis;
}
