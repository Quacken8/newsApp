import axios from "axios";
import { parseString } from "xml2js";

export async function fetchRssFeed(url: string) {
  try {
    const response = await axios.get(url);
    const xmlData = response.data;
    return xmlData;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    throw error;
  }
}

export function parseRssFeed(xmlData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export async function fetchAndParseRssFeed(url: string) {
  const xmlData = await fetchRssFeed(url);
  const parsedRssFeed = await parseRssFeed(xmlData);
  return parsedRssFeed;
}

function test() {
  const RSS_FEED_URL =
    "https://www.reutersagency.com/feed/?taxonomy=best-sectors&post_type=best";
  fetchAndParseRssFeed(RSS_FEED_URL).then((parsedRssFeed) => {
    console.log(parsedRssFeed.rss.channel[0]);
  });
}

//test();
