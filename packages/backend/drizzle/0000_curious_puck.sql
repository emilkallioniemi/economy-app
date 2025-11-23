CREATE TABLE "dummy" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now()
);
