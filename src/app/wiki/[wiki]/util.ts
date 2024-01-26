export function parseBody(target: string, titleMap: Map<string, number>) {
  const searchWikiTitles = [...titleMap.keys()];
  const regexPattern = new RegExp("(" + searchWikiTitles.join("|") + ")", "g");

  const result = target.split(regexPattern);
  return result.filter((item) => item !== "");
}

export function createWikiMap(wikiList: { id: number; title: string }[]) {
  const wikiMap = new Map<string, number>();
  for (let i = 0; i < wikiList.length; i++) {
    wikiMap.set(wikiList[i].title, wikiList[i].id);
  }

  return wikiMap;
}
