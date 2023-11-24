import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";
import type { SourceContent } from "$lib/types";
import dayjs from "dayjs";

const RSS_FEED_URL = "https://www.aktualne.cz/rss/";

export function fetchAljazeeraArticles(): Promise<ArticleContent[]> {
  const source: SourceContent = {
    name: "Al Jazeera",
    link: "https://www.aljazeera.com/",
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
          keywords: article.category?.map(
            (category: { _: any; $: { domain: any } }) => ({
              text: category._,
              link: category.$.domain,
            })
          ),
          date: article.pubDate[0],
          source,
        } as ArticleContent)
    )
  );
}
