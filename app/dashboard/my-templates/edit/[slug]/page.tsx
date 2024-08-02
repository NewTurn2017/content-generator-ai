'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { UserTemplates } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'

type Template = {
  id: number
  name: string
  desc: string
  category: string
  icon: string
  aiPrompt: string
  slug: string
  form: Array<{
    label: string
    field: string
    name: string
    options?: string[]
    required: boolean
  }>
}

const EditTemplatePage = ({ params }: { params: { slug: string } }) => {
  const [template, setTemplate] = useState<Template | null>(null)
  const [formFields, setFormFields] = useState<Template['form']>([])
  const [slugError, setSlugError] = useState('')

  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    const loadTemplate = async () => {
      const userTemplate = await db
        .select()
        .from(UserTemplates)
        .where(eq(UserTemplates.slug, params.slug))
        .execute()
      if (userTemplate.length > 0) {
        const template = userTemplate[0] as Template
        setTemplate(template)
        setFormFields(template.form || [])
      } else {
        setTemplate(null)
      }
    }
    loadTemplate()
  }, [params.slug])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setTemplate((prev) => {
      if (prev === null) return null
      return { ...prev, [name]: value }
    })
  }

  const handleSlugChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value
    setTemplate((prev) => {
      if (prev === null) return null
      return { ...prev, slug: newSlug }
    })

    // 슬러그 중복 검사
    const existingTemplate = await db
      .select()
      .from(UserTemplates)
      .where(eq(UserTemplates.slug, newSlug))
      .execute()
    if (
      existingTemplate.length > 0 &&
      existingTemplate[0].id !== template?.id
    ) {
      setSlugError('이미 사용 중인 슬러그입니다.')
    } else {
      setSlugError('')
    }
  }

  const handleFormFieldChange = (
    index: number,
    field: Partial<Template['form'][0]>
  ) => {
    setFormFields((prev) => {
      const newFields = [...prev]
      newFields[index] = { ...newFields[index], ...field }
      return newFields
    })
  }

  const handleOptionsChange = (index: number, options: string) => {
    setFormFields((prev) => {
      const newFields = [...prev]
      newFields[index] = {
        ...newFields[index],
        options: options.split(',').map((option) => option.trim()),
      }
      return newFields
    })
  }

  const addFormField = () => {
    setFormFields((prev) => [
      ...prev,
      { label: '', field: 'input', name: '', required: false },
    ])
  }

  const removeFormField = (index: number) => {
    setFormFields((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (slugError) {
      alert('유효하지 않은 슬러그입니다. 다른 슬러그를 사용해주세요.')
      return
    }
    if (user?.emailAddresses[0].emailAddress && template) {
      const updatedTemplate = {
        ...template,
        form: formFields,
        updatedAt: new Date(),
      }
      try {
        await db
          .update(UserTemplates)
          .set(updatedTemplate)
          .where(eq(UserTemplates.id, template.id))
        router.push('/dashboard/my-templates')
      } catch (error) {
        console.error('템플릿 업데이트 중 오류 발생:', error)
        alert('템플릿 업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.')
      }
    }
  }

  if (!template) return <div className='p-5'>템플릿을 찾을 수 없습니다.</div>

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-4'>템플릿 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block mb-2'>
            이름
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={template.name}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='slug' className='block mb-2'>
            슬러그
          </label>
          <input
            type='text'
            id='slug'
            name='slug'
            value={template.slug}
            onChange={handleSlugChange}
            className='w-full p-2 border rounded'
          />
          {slugError && <p className='text-red-500'>{slugError}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='category' className='block mb-2'>
            카테고리
          </label>
          <input
            type='text'
            id='category'
            name='category'
            value={template.category}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='desc' className='block mb-2'>
            설명
          </label>
          <textarea
            id='desc'
            name='desc'
            value={template.desc}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='aiPrompt' className='block mb-2'>
            AI 프롬프트
          </label>
          <textarea
            id='aiPrompt'
            name='aiPrompt'
            value={template.aiPrompt}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            rows={5}
          />
        </div>

        <h2 className='text-xl font-bold mt-6 mb-4'>폼 필드</h2>
        {formFields.map((field, index) => (
          <div key={index} className='mb-4'>
            <input
              type='text'
              value={field.label}
              onChange={(e) =>
                handleFormFieldChange(index, { label: e.target.value })
              }
              placeholder='라벨'
              className='w-full p-2 border rounded mb-2'
            />
            <select
              value={field.field}
              onChange={(e) =>
                handleFormFieldChange(index, { field: e.target.value })
              }
              className='w-full p-2 border rounded mb-2'
            >
              <option value='input'>입력</option>
              <option value='textarea'>텍스트 영역</option>
              <option value='select'>선택</option>
              <option value='multiSelect'>다중 선택</option>
            </select>
            {(field.field === 'select' || field.field === 'multiSelect') && (
              <div>
                <label className='block mb-2'>옵션 (쉼표로 구분)</label>
                <input
                  type='text'
                  value={field.options?.join(', ') || ''}
                  onChange={(e) => handleOptionsChange(index, e.target.value)}
                  className='w-full p-2 border rounded mb-2'
                />
              </div>
            )}
            <input
              type='text'
              value={field.name}
              onChange={(e) =>
                handleFormFieldChange(index, { name: e.target.value })
              }
              placeholder='필드 이름'
              className='w-full p-2 border rounded mb-2'
            />
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={field.required}
                onChange={(e) =>
                  handleFormFieldChange(index, { required: e.target.checked })
                }
                className='mr-2'
              />
              필수 항목
            </label>
            <div className='flex items-center gap-4 mt-5'>
              <Button type='button' onClick={addFormField}>
                필드 추가
              </Button>
              <Button
                type='button'
                onClick={() => removeFormField(index)}
                variant='destructive'
              >
                필드 삭제
              </Button>
            </div>
          </div>
        ))}

        <Button type='submit' className='mt-4'>
          템플릿 업데이트
        </Button>
      </form>
    </div>
  )
}

export default EditTemplatePage
