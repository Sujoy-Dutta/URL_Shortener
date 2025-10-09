import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const userTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar('first_name', {length: 20}).notNull(),
    lastName: varchar('last_name', {length: 20}).notNull(),
    email: varchar({length: 255}),
    password: text().notNull(),
    salt: text().notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})