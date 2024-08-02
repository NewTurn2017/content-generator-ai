'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import defaultTemplates from '@/app/(data)/Templates'
import { db } from '@/utils/db'
import { UserTemplates } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'

// UserTemplate 타입 정의
type UserTemplate = {
  id: number
  name: string
  createdAt: Date | null
  userId: string
  desc: string | null
  category: string | null
  icon: string | null
  aiPrompt: string | null
  slug: string | null
  form: unknown
  updatedAt: Date | null
}

const EditPage = () => {
  const [systemTemplates, setSystemTemplates] = useState<UserTemplate[]>([])
  const [userTemplates, setUserTemplates] = useState<UserTemplate[]>([])
  const { user } = useUser()

  useEffect(() => {
    const fetchTemplates = async () => {
      if (user?.id) {
        const allTemplates = await db.select().from(UserTemplates)
        const formattedTemplates = allTemplates.map((t) => ({
          ...t,
          userId: t.userEmail,
        }))

        setSystemTemplates(
          formattedTemplates.filter((t) => t.userEmail === 'system@example.com')
        )
        setUserTemplates(
          formattedTemplates.filter(
            (t) => t.userEmail === user.primaryEmailAddress?.emailAddress
          )
        )
      }
    }
    fetchTemplates()
  }, [user])

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-4'>템플릿 관리</h1>

      <h2 className='text-xl font-semibold mb-2'>기본 템플릿</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
        {systemTemplates.map((template) => (
          <div key={template.id} className='border p-4 rounded-lg'>
            <h3 className='text-lg font-semibold'>{template.name}</h3>
            <p className='text-gray-600'>{template.desc}</p>
            <Link href={`/dashboard/my-templates/copy/${template.slug}`}>
              <Button className='mt-2'>복사하여 새 템플릿 만들기</Button>
            </Link>
          </div>
        ))}
      </div>

      <h2 className='text-xl font-semibold mb-2'>내 템플릿</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {userTemplates.map((template) => (
          <div key={template.id} className='border p-4 rounded-lg'>
            <h3 className='text-lg font-semibold'>{template.name}</h3>
            <p className='text-gray-600'>{template.desc}</p>
            <Link href={`/dashboard/my-templates/edit/${template.slug}`}>
              <Button className='mt-2'>수정</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditPage
