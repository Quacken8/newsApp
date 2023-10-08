import { fetchAndParseRssFeed } from "./rssReader";
import type { ArticleContent } from "$lib/components/Article.svelte";

const RSS_FEED_URL = "https://www.aktualne.cz/rss/";

export function fetchAktualneArticles(): Promise<ArticleContent[]> {
  const rssFeed = fetchAndParseRssFeed(RSS_FEED_URL);
  const articles = rssFeed.then((feed) => feed.rss.channel[0].item);

  const imgTagRegex = /<img.*?src=["'](.*?)["'].*?alt=["'](.*?)["'].*?>/;

  return articles.then((articles) =>
    articles.map((article: any) => ({
      title: article.title[0],
      link: article.link[0],
      perex: article.description[0],
      keywords: article.category.map(
        (category: { _: any; $: { domain: any } }) => ({
          text: category._,
          link: category.$.domain,
        })
      ),
      date: new Date(article.pubDate[0]),
      imageSrc: article["content:encoded"][0].match(imgTagRegex)?.[1],
      imageAlt: article["content:encoded"][0].match(imgTagRegex)?.[2],
    }))
  );
}
