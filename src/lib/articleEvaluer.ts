import dayjs from "dayjs";
import type { ArticleContent } from "./components/Article.svelte";
import type { NewArticle } from "./db/schema";

/** Returns an article with assigned score */
export function scoreArticle(article: ArticleContent): NewArticle {
  const score = 0;
  return {
    ...article,
    source: article.source.name,
    date: dayjs(article.date).format("DD-MMM-YYYY"),
    keywords: article.keywords?.map((keyword) => keyword.text).join(", "),
    score,
  };
}
