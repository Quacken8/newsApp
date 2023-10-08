import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";

const RSS_FEED_URL = "https://rss.nytimes.com/services/xml/rss/nyt/World.xml";

export function fetchAktualneArticles(): Promise<ArticleContent[]> {
  const source = "New York Times";
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed.then((feed) => feed.rss.channel[0].item);

  return articles.then((articles) =>
    articles.map((article: any) => ({
      title: article.title[0],
      link: article.link[0],
      perex: article.description[0],
      date: new Date(article.pubDate[0]),
      imageSrc: article["media:content"][0].$.url,
      imageAlt: article["media:description"][0],
      source,
    }))
  );
}
