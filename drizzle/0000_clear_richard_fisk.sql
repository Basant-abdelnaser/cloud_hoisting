CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200),
	"description" text,
	"created_at" timestamp DEFAULT now()
);
