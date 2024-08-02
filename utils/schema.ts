import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const AIOutput = pgTable('aiOutput', {
  id: serial('id').primaryKey(),
  formData: varchar('formData').notNull(),
  aiResponse: text('aiResponse'),
  templateSlug: varchar('templateSlug').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  model: varchar('model').notNull(), // 모델 컬럼 추가
})

// Start of Selection
export const UserTemplates = pgTable('user_templates', {
  id: serial('id').primaryKey(),
  userEmail: varchar('user_email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  desc: text('desc'),
  category: varchar('category', { length: 100 }),
  icon: varchar('icon', { length: 255 }),
  aiPrompt: text('ai_prompt'),
  slug: varchar('slug', { length: 255 }),
  form: json('form'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
