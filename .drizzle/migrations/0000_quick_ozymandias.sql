CREATE TABLE IF NOT EXISTS "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"score" integer NOT NULL,
	"perex" text,
	"date" date NOT NULL,
	"keywords" jsonb,
	"image_src" text,
	"image_alt" text,
	"link" text NOT NULL,
	"sourceName" text NOT NULL,
	"sourceLink" text NOT NULL
);
