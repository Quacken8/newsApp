import { db } from "$lib/db/db";
import { articleSchema } from "$lib/db/schema";
import dayjs from "dayjs";
import type { PageServerLoad } from "./$types";
import type { ChipContent } from "$lib/components/Chip.svelte";

export const load = (() => {
  return {
    articles: db
      .select()
      .from(articleSchema)
      .limit(30)
      .then((articles) =>
        articles.map((article) => ({
          ...article,
          date: article.date,
          keywords: article.keywords?.split(", ").map((keyword) => ({
            text: keyword,
          })) as ChipContent[],
        }))
      ),
  };
}) satisfies PageServerLoad;
