import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from '../models/user.model.js';

export const urlsTable = pgTable('urls', {
    id: uuid().primaryKey().defaultRandom(),

    shortCode: varchar('code', {length: 155}).notNull().unique(),
    targetUrl: text('target_url').notNull(),

    userId: uuid('user_id')
        .references(() => userTable.id)
        .notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})