import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";
import type { SourceContent } from "$lib/types";
import dayjs from "dayjs";

const RSS_FEED_URL = "https://feeds.bbci.co.uk/news/rss.xml?edition=int#";

export function fetchBBCArticles(): Promise<ArticleContent[]> {
  const source: SourceContent = {
    name: "BBC News",
    link: "https://www.bbc.com/news",
  };
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed.then((feed) => feed.rss.channel[0].item);

  return articles.then((articles) =>
    articles.map(
      (article: any) =>
        ({
          title: String(article.title[0]),
          link: String(article.link[0]),
          perex: String(article.description[0]),
          date: article.pubDate[0],
          source,
        } as ArticleContent)
    )
  );
}
