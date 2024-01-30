import { fetchAndParseRssFeed } from "./rssReader";
import type { SourceContent } from "$lib/types";
import dayjs from "dayjs";
import type { InsertType } from "$lib/dbUpdater";

const RSS_FEED_URL = "http://america.aljazeera.com/content/ajam/articles.rss";

export function fetchAljazeeraArticles(): Promise<InsertType[]> {
  const source: SourceContent = {
    name: "Al Jazeera",
    link: "https://www.aljazeera.com/",
  };
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed
    .then((feed) => feed.rss.channel[0].item)
    .then((a) => {
      console.log(`Fetched ${a.length} articles from Aljazeera.com`);
      return a;
    });
  return articles.then((articles) =>
    articles.map(
      (article: any) =>
        ({
          title: String(article.title[0]),
          articleLink: String(article.link[0]),
          perex: String(article.description[0]),
          imageSrc: String(article.enclosure[0].$.url),
          date: article.pubDate[0],
          sourceLink: source.link,
          sourceName: source.name,
          score: 0,
        } satisfies InsertType)
    )
  );
}
