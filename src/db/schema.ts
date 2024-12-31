import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    email: text().notNull().primaryKey(),
    password: text().notNull()
})