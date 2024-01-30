import { fetchAndParseRssFeed } from "./rssReader";
import type { SourceContent } from "$lib/types";
import dayjs from "dayjs";
import type { InsertType } from "$lib/dbUpdater";

const RSS_FEED_URL = "https://ct24.ceskatelevize.cz/rss/hlavni-zpravy";

export function fetchCT24Articles(): Promise<InsertType[]> {
  const source: SourceContent = { name: "ČT24", link: "https://ct24.cz" };
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed
    .then((feed) => feed.rss.channel[0].item)
    .then((a) => {
      console.log(`Fetched ${a.length} articles from ct24.cz`);
      return a;
    });

  return articles.then((articles) =>
    articles.map(
      (article: any) =>
        ({
          title: String(article.title[0].trim()),
          articleLink: String(article.link[0]),
          perex: String(article.description[0].trim()),
          date: article.pubDate[0],
          imageSrc: String(article.thumb?.[0] ?? article.enclosure?.[0].$.url),
          imageAlt: String((article.aternativeText ?? [])[0]),
          sourceLink: source.link,
          sourceName: source.name,
          score: 0,
        } satisfies InsertType)
    )
  );
}
