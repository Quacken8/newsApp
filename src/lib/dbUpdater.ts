import { scoreArticle } from "./articleEvaluer";
import { pushArticle } from "./articlePusher";
import { getAllArticles } from "./articleScrapers/getAll";
import { db } from "./db/db";
import { articleSchema } from "./db/schema";

/** Scrapes all articles and throws them into the db */
export async function updateDB() {
  await db
    .insert(articleSchema)
    .values((await getAllArticles()).map(scoreArticle));
}

updateDB();
