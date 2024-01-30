import type { ChipContent } from "$lib/components/Chip.svelte";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  date,
  text,
  json,
} from "drizzle-orm/pg-core";

export const articleSchema = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  score: integer("score").notNull(),
  perex: text("perex"),
  date: date("date").notNull(),
  keywords: json("keywords").$type<ChipContent[]>(),
  imageSrc: text("image_src"),
  imageAlt: text("image_alt"),
  articleLink: text("link").notNull(),
  sourceName: text("sourceName").notNull(),
  sourceLink: text("sourceLink").notNull(),
});

//  export type ArticleContent = {
//    title?: string;
//    perex?: string;
//    date?: Date;
//    keywords?: ChipContent[];
//    imageSrc?: string;
//    imageAlt?: string;
//    link?: string;
//    source: SourceContent;
//    id: number;
//  };
