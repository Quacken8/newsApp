import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";
import type { SourceContent } from "$lib/components/Source.svelte";

const RSS_FEED_URL = "https://ct24.ceskatelevize.cz/rss/hlavni-zpravy";

export function fetchAktualneArticles(): Promise<ArticleContent[]> {
  const source: SourceContent = { name: "ČT24" };
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed.then((feed) => feed.rss.channel[0].item);

  return articles.then((articles) =>
    articles.map(
      (article: any) =>
        ({
          title: String(article.title[0].trim()),
          link: String(article.link[0]),
          perex: String(article.description[0].trim()),
          date: new Date(article.pubDate[0]),
          imageSrc: String(article.thumb[0]),
          imageAlt: String(article.aternativeText[0]),
          source,
        } as ArticleContent)
    )
  );
}
