CREATE TYPE "public"."entry_type" AS ENUM('fixed', 'dynamic');--> statement-breakpoint
CREATE TYPE "public"."recurrence_pattern" AS ENUM('daily', 'weekly', 'monthly', 'yearly');--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" text NOT NULL,
	"type" "entry_type" NOT NULL,
	"category" text,
	"recurrence_pattern" "recurrence_pattern",
	"start_date" date,
	"end_date" date,
	"expense_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" text NOT NULL,
	"type" "entry_type" NOT NULL,
	"category" text,
	"recurrence_pattern" "recurrence_pattern",
	"start_date" date,
	"end_date" date,
	"income_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
