import { fetchWikiDetail } from "@/api/database";
import { redirect } from "next/navigation";
import { updateWiki } from "@/api/database";
import BackButton from "./back-button";

export const revalidate = 0;

export default async function WikiEditPage({
  params,
}: {
  params: { wiki: number };
}) {
  const currentWikiNum = params.wiki;
  const wiki = await fetchWikiDetail(currentWikiNum);

  const submitUpdateRequest = async (formData: FormData) => {
    "use server";

    const params = {
      id: wiki.id,
      title: String(formData.get("title")),
      body: String(formData.get("body")),
    };

    await updateWiki(params);

    redirect(`/wiki/${wiki.id}`);
  };

  return (
    <form action={submitUpdateRequest}>
      <h2 className="pb-4">
        제목: <input defaultValue={wiki.title} name="title" />
      </h2>
      <textarea name="body" defaultValue={wiki.body}></textarea>
      <nav className="flex gap-2">
        <BackButton />
        <button type="submit" className="no-underline">
          수정
        </button>
      </nav>
    </form>
  );
}
