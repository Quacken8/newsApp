import type { SourceContent } from "$lib/types";
import dayjs from "dayjs";
import { fetchAndParseRssFeed } from "./rssReader";
import type { InsertType } from "$lib/dbUpdater";

const RSS_FEED_URL = "https://www.irozhlas.cz/rss/irozhlas";

export function fetchIrozhlasArticles(): Promise<InsertType[]> {
  const source: SourceContent = {
    name: "iROZHLAS.cz",
    link: "https://www.irozhlas.cz/",
  };
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed
    .then((feed) => feed.rss.channel[0].item)
    .then((a) => {
      console.log(`Fetched ${a.length} articles from iROZHLAS.cz`);
      return a;
    });

  return articles.then((articles) =>
    articles.map(
      (article: any) =>
        ({
          title: String(article.title[0]),
          articleLink: String(article.link[0]),
          perex: String(article.description[0]),
          date: article.pubDate[0],
          imageSrc: article.enclosure[0].$.url,
          sourceLink: source.link,
          sourceName: source.name,
          score: 0,
        } satisfies InsertType)
    )
  );
}
