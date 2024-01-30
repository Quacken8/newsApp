import dayjs from "dayjs";
import { pushArticle, scoreArticle } from "./articleHandler";
import { getAllArticles } from "./articleScrapers/getAll";
import { db } from "./db/db";
import { articleSchema } from "./db/schema";
import { eq, gt, lt } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

const insertSchema = createInsertSchema(articleSchema);
export type InsertType = z.infer<typeof insertSchema>;
export const selectSchema = createSelectSchema(articleSchema);
export type SelectType = z.infer<typeof selectSchema>;

/** Removes articles from the database that are more than input days old */
export async function removeOld(days: number = 7) {
  const cutoffDate = dayjs().subtract(days, "days").toISOString();

  const deleted = await db
    .delete(articleSchema)
    .where(lt(articleSchema.date, cutoffDate))
    .returning();
  console.log(`Deleted ${deleted.length} articles`);
}

export async function addNew() {
  const newArticles = (await getAllArticles()).map((article) =>
    insertSchema.parse(article)
  );

  const uniqueArticles = (
    (
      await Promise.all(
        newArticles.map(async (article) => {
          //check if it already exists
          const existingArticle = await db.query.articleSchema.findFirst({
            where: eq(articleSchema.title, article.title),
          });

          return existingArticle ? undefined : article;
        })
      )
    ).filter((a) => a !== undefined) as SelectType[]
  ).map(scoreArticle);

  console.log(`Adding ${uniqueArticles.length} new articles`);
  await db
    .insert(articleSchema)
    .values(uniqueArticles.map((a) => insertSchema.parse(a) as any)); // dw zod, the json is good
}

export async function refreshArticles() {
  await removeOld();
  console.log("Out with the old");
  await addNew();
  console.log("In with the new");
}

refreshArticles();
