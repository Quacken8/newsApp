import type dayjs from "dayjs";
import { db } from "./db/db";
import { articleSchema, type Article, type NewArticle } from "./db/schema";
import type { InsertType, SelectType } from "./dbUpdater";

/** Pushes article to the database */
export async function pushArticle(article: NewArticle) {
  return await db.insert(articleSchema).values(article);
}

type Filter = {
  date?: {
    gte: Date;
  };
  source?: {
    name: {
      in: string[];
    };
  };
  score?: {
    gte: number;
  };
};

/** Fetches articles from the database */
export async function fetchArticles(
  since?: dayjs.Dayjs,
  sources?: string[],
  betterThan?: number
): Promise<Article[]> {
  const filter: Filter = {};
  if (since) {
    filter["date"] = {
      gte: since?.toDate(),
    };
  }
  if (sources) {
    filter["source"] = {
      name: {
        in: sources,
      },
    };
  }
  if (betterThan) {
    filter["score"] = {
      gte: betterThan,
    };
  }

  return await db.query.articleSchema.findMany({
    with: filter,
  });
}

/** Returns an article with assigned score */
export function scoreArticle(article: SelectType): InsertType {
  const score = 0;
  return {
    ...article,
    score,
  };
}
