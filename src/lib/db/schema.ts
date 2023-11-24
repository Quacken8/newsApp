import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  date,
} from "drizzle-orm/pg-core";

export const articleSchema = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  score: integer("score").notNull(),
  perex: varchar("perex", { length: 2047 }),
  date: date("date").notNull(),
  keywords: varchar("keywords", { length: 255 }),
  imageSrc: varchar("image_src", { length: 255 }),
  imageAlt: varchar("image_alt", { length: 255 }),
  link: varchar("link", { length: 255 }),
  source: varchar("source", { length: 255 }).notNull(),
});

export type Article = typeof articleSchema.$inferSelect;
export type NewArticle = typeof articleSchema.$inferInsert;

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
