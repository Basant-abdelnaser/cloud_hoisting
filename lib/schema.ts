import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* =========================
  ARTICLE
========================= */

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
  USER
========================= */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull(),
  password: text("password").notNull(),

  isAdmin: boolean("is_admin").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================
   COMMENT
========================= */
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),

  text: text("text").notNull(),

  articleId: integer("article_id")
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// Relations

export const usersRelations = relations(users, ({ many }) => ({
  comments: many(comments),
}));

export const articlesRelations = relations(articles, ({ many }) => ({
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),

  article: one(articles, {
    fields: [comments.articleId],
    references: [articles.id],
  }),
}));