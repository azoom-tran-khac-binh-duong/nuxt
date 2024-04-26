import { sql } from 'drizzle-orm'
import { boolean, datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const taskSchema = mysqlTable('task', {
  id: int('id').autoincrement().primaryKey(),
  text: varchar('title', { length: 255 }).notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export type Task = typeof taskSchema.$inferSelect
export type NewTask = typeof taskSchema.$inferInsert
