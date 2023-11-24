import { db } from "./db/db";
import { articleSchema, type NewArticle } from "./db/schema";

/** Pushes article to the database */
export async function pushArticle(article: NewArticle) {
  return await db.insert(articleSchema).values(article);
}
