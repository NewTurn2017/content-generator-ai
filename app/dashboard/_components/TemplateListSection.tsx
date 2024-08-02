import Templates from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
  name: string
  desc: string
  category: string
  icon: string
  aiPrompt: string
  slug: string
  form: FORM[]
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
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(
    Templates as TEMPLATE[]
  ) // 타입 명시 추가
  useEffect(() => {
    if (userSearchInput) {
      const filterData = Templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      ) as TEMPLATE[] // 타입 캐스팅 추가
      setTemplateList(filterData)
    } else {
      setTemplateList(Templates as TEMPLATE[]) // 타입 캐스팅 추가
    }
  }, [userSearchInput])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-10'>
      {templateList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  )
}

export default TemplateListSection
