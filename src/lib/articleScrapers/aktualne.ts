import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";
import type { SourceContent } from "$lib/types";
import dayjs from "dayjs";

const RSS_FEED_URL = "https://www.aktualne.cz/rss/";

export function fetchAktualneArticles(): Promise<ArticleContent[]> {
  const source: SourceContent = {
    name: "Aktuálně.cz",
    link: "https://www.aktualne.cz/",
  };
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed.then((feed) => feed.rss.channel[0].item);

  const imgTagRegex = /<img.*?src=["'](.*?)["'].*?alt=["'](.*?)["'].*?>/;

  return articles.then((articles) =>
    articles.map(
      (article: any) =>
        ({
          title: String(article.title[0]),
          link: String(article.link[0]),
          perex: String(article.description[0]),
          keywords: article.category?.map(
            (category: { _: any; $: { domain: any } }) => ({
              text: category._,
              link: category.$.domain,
            })
          ),
          date: article.pubDate[0],
          imageSrc: String(
            article["content:encoded"][0].match(imgTagRegex)?.[1]
          ),
          imageAlt: String(
            article["content:encoded"][0].match(imgTagRegex)?.[2]
          ),
          source,
        } as ArticleContent)
    )
  );
}
