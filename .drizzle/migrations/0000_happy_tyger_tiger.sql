CREATE TABLE IF NOT EXISTS "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"perex" varchar(255),
	"date" date NOT NULL,
	"keywords" varchar(255),
	"image_src" varchar(255),
	"image_alt" varchar(255),
	"link" varchar(255),
	"source" varchar(255) NOT NULL
);
