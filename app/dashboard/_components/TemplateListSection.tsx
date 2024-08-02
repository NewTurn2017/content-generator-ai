'use client'

import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'
import { UserTemplates } from '@/utils/schema'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'

export interface TEMPLATE {
  name: string
  desc: string
  category: string
  icon: string
  aiPrompt: string
  slug: string
  form: FORM[]
  createdBy: string
}

export interface FORM {
  label: string
  field: 'select' | 'multiSelect' | 'input' | 'textarea'
  name: string
  options?: string[]
  required: boolean
}

const TemplateListSection = ({
  userSearchInput,
}: {
  userSearchInput: string
}) => {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>([])
  const { user } = useUser()

  useEffect(() => {
    const fetchTemplates = async () => {
      // 사용자가 만든 템플릿 가져오기
      const userTemplates = await db.select().from(UserTemplates)

      // 사용자 템플릿 포맷팅
      const formattedUserTemplates: TEMPLATE[] = userTemplates.map(
        (template) => ({
          ...template,
          createdBy: template.userEmail, // 여기를 수정했습니다
          category: template.category ?? '',
          icon: template.icon ?? '',
          aiPrompt: template.aiPrompt ?? '',
          form: Array.isArray(template.form) ? template.form : [],
          desc: template.desc ?? '',
          slug: template.slug ?? '',
        })
      )

      // 검색 필터링
      if (userSearchInput) {
        const filteredTemplates = formattedUserTemplates.filter((item) =>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
        )
        setTemplateList(filteredTemplates)
      } else {
        setTemplateList(formattedUserTemplates)
      }
    }

    fetchTemplates()
  }, [userSearchInput])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 p-10'>
      {templateList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} userEmail={item.createdBy} />
      ))}
    </div>
  )
}

export default TemplateListSection
