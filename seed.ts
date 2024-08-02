import { db } from '@/utils/db'
import { UserTemplates } from '@/utils/schema'
import defaultTemplates from '@/app/(data)/Templates'

async function seedTemplates() {
  for (const template of defaultTemplates) {
    await db
      .insert(UserTemplates)
      .values({
        ...template,
        userEmail: 'system@example.com', // 시스템 템플릿임을 나타내는 이메일
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoNothing() // 이미 존재하는 경우 무시
  }
  console.log('Templates seeded successfully')
}

seedTemplates().catch(console.error)
