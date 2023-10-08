import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";

const RSS_FEED_URL = "https://ct24.ceskatelevize.cz/rss/hlavni-zpravy";

export function fetchAktualneArticles(): Promise<ArticleContent[]> {
  const source = "ČT24";
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed.then((feed) => feed.rss.channel[0].item);

  return articles.then((articles) =>
    articles.map((article: any) => ({
      title: article.title[0].trim(),
      link: article.link[0],
      perex: article.description[0].trim(),
      date: new Date(article.pubDate[0]),
      imageSrc: article.thumb[0],
      imageAlt: article.aternativeText[0],
      source,
    }))
  );
}
