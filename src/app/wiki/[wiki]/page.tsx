import { createClient } from "@supabase/supabase-js";
import { Database } from "@/interface/supabase";
import { notFound } from "next/navigation";

async function fetchWikiDetail(wikiNum: number) {
  const supabaseUrl = "https://mywzayzepbfaahgayxty.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3pheXplcGJmYWFoZ2F5eHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODA3MzcsImV4cCI6MjAyMTY1NjczN30.5dismLpTWMzMuTa7ra5tpAA83oOMV7fgktf06hJNf3w";
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  const { data: wiki, error } = await supabase
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
