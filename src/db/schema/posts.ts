import {
  serial,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  mysqlEnum,
  text
} from "drizzle-orm/mysql-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations } from 'drizzle-orm';
export const posts = mysqlTable("post", {
  id: serial('id').notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  content: text("content").notNull()
})

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));


export const insertPostSchema = createInsertSchema(posts, {
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  content: z.string().trim().min(1),
}).pick({
  title: true,
  description: true,
  content: true,
})
export type TInsertPostSchema = z.infer<typeof insertPostSchema>;
