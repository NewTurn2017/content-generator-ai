'use client'

import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { HISTORY } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import { TEMPLATE } from '../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Copy, Check } from 'lucide-react'

const History = () => {
  const { user } = useUser()
  const [historyList, setHistoryList] = useState<HISTORY[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const getTemplateName = (slug: string) => {
    const template: TEMPLATE | any = Templates?.find(
      (item) => item.slug == slug
    )
    return template || { icon: '', name: 'Unknown' }
  }

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1000)
  }

  useEffect(() => {
    const fetchHistory = async () => {
      const fetchedHistory = await db
        .select()
        .from(AIOutput)
        .where(
          eq(AIOutput?.createdBy, user?.emailAddresses[0].emailAddress ?? '')
        )
        .orderBy(desc(AIOutput.id))
      setHistoryList(
        fetchedHistory.map((item) => ({
          ...item,
          aiResponse: item.aiResponse || '',
          createdAt: item.createdAt || '',
          model: item.model || '', // 모델 정보 추가
        }))
      )
    }
    fetchHistory()
  }, [user])

  return (
    <div className='p-3'>
      <h1 className='text-2xl font-bold mb-4'>히스토리</h1>
      <p className='mb-4'>
        이 페이지에서는 AI 응답의 히스토리를 확인할 수 있습니다.
      </p>
      <div className='grid grid-cols-10 gap-4 my-5 py-3 px-3 font-bold bg-slate-800 text-white'>
        <h2 className='col-span-2'>템플릿</h2>
        <h2 className='col-span-4'>AI 응답</h2>
        <h2>생성 날짜</h2>
        <h2>응답 길이</h2>
        <h2>모델</h2> {/* 모델 컬럼 추가 */}
        <h2>작업</h2>
      </div>
      {historyList &&
        historyList.map((item: HISTORY, index: number) => (
          <div
            key={index}
            className='grid grid-cols-10 gap-4 my-5 py-3 px-3 border'
          >
            <h2 className='col-span-2 flex gap-2 items-center'>
              <Image
                src={getTemplateName(item?.templateSlug).icon}
                width={25}
                height={25}
                alt={getTemplateName(item?.templateSlug)?.name}
              />
              {getTemplateName(item?.templateSlug)?.name}
            </h2>
            <h2 className='col-span-4 line-clamp-3'>{item?.aiResponse}</h2>
            <h2>{item.createdAt}</h2>
            <h2>{item?.aiResponse.length}</h2>
            <h2>{item?.model}</h2> {/* 모델 정보 표시 */}
            <h2>
              <Button
                variant='ghost'
                className='text-primary'
                onClick={() => handleCopy(item?.aiResponse, index)}
                disabled={copiedIndex === index}
              >
                {copiedIndex === index ? (
                  <Check className='w-4 h-4 mr-2' />
                ) : (
                  <Copy className='w-4 h-4 mr-2' />
                )}
                {copiedIndex === index ? '복사 완료' : '복사'}
              </Button>
            </h2>
          </div>
        ))}
    </div>
  )
}

export default History
