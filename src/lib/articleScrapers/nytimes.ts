import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";
import type { SourceContent } from "$lib/types";
import dayjs from "dayjs";

const RSS_FEED_URL = "https://rss.nytimes.com/services/xml/rss/nyt/World.xml";

export function fetchNYTimesArticles(): Promise<ArticleContent[]> {
  const source: SourceContent = {
    name: "New York Times",
    link: "https://www.nytimes.com/section/world",
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
          imageSrc: String((article["media:content"] ?? [])[0]?.$.url),
          imageAlt: String((article["media:description"] ?? [])[0]),
          source,
        } as ArticleContent)
    )
  );
}
