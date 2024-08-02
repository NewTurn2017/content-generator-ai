'use client'

import React, { useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'
import { TOKEN_LIMIT } from '../../_components/UsageTrack'
import { openaiChatCompletion } from '@/actions/openai'
import { geminiChatCompletion } from '@/actions/googleai'
import { claudeChatCompletion } from '@/actions/anthropicai'
import { groqChatCompletion } from '@/actions/groqai'

interface Props {
  params: {
    'template-slug': string
  }
}

const CreateNewContent = ({ params }: Props) => {
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')
  const [showAlert, setShowAlert] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash')

  const { user } = useUser()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext)
  const router = useRouter()

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === params['template-slug']
  ) as TEMPLATE | undefined

  const generateAIContent = async (formData: any) => {
    if ((totalUsage as number) >= TOKEN_LIMIT) {
      setShowAlert(true)

      return
    }
    setLoading(true)
    const selectedPrompt = selectedTemplate?.aiPrompt

    const FinalAIPrompt = `${JSON.stringify(formData)}, ${selectedPrompt}`

    let result
    if (selectedModel === 'gemini-1.5-flash') {
      result = await geminiChatCompletion(FinalAIPrompt, 'gemini-1.5-flash')
    } else if (selectedModel === 'gemini-1.5-pro') {
      result = await geminiChatCompletion(FinalAIPrompt, 'gemini-1.5-pro')
    } else if (selectedModel === 'openai-gpt-4o') {
      result = await openaiChatCompletion(FinalAIPrompt, 'gpt-4o')
    } else if (selectedModel === 'openai-gpt-4o-mini') {
      result = await openaiChatCompletion(FinalAIPrompt, 'gpt-4o-mini')
    } else if (selectedModel === 'anthropic-sonnet-3.5') {
      result = await claudeChatCompletion(FinalAIPrompt)
    } else if (selectedModel === 'groq-llama-3.1-8b-instant') {
      result = await groqChatCompletion(FinalAIPrompt, 'llama-3.1-8b-instant')
    } else if (selectedModel === 'groq-llama-3.1-70b-versatile') {
      result = await groqChatCompletion(
        FinalAIPrompt,
        'llama-3.1-70b-versatile'
      )
    } else {
      throw new Error('Unsupported model')
    }

    setAiOutput(result)

    await saveDb(formData, selectedTemplate?.slug!, result, selectedModel)

    setLoading(false)

    setUpdateCreditUsage(Date.now())
  }

  const saveDb = async (
    formData: any,
    slug: string,
    aiResp: string,
    model: string
  ) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        model: model, // 모델 정보 추가
      })
      console.log(result)
    } catch (error) {
      console.error('Error inserting data:', error)
    }
  }

  return (
    <div className='p-5'>
      <div className='flex justify-between items-center px-5'>
        <Link href='/dashboard'>
          <Button variant='outline'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            뒤로가기
          </Button>
        </Link>

        <div>
          <Select
            onValueChange={(value) => setSelectedModel(value)}
            defaultValue='groq-llama-3.1-8b-instant'
          >
            <SelectTrigger>
              <SelectValue placeholder='모델 선택' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='gemini-1.5-flash'>
                Google Gemini 1.5 Flash
              </SelectItem>
              <SelectItem value='gemini-1.5-pro'>
                Google Gemini 1.5 Pro
              </SelectItem>
              <SelectItem value='openai-gpt-4o'>OpenAI GPT-4o</SelectItem>
              <SelectItem value='openai-gpt-4o-mini'>
                OpenAI GPT-4o Mini
              </SelectItem>
              <SelectItem value='anthropic-sonnet-3.5'>
                Anthropic Sonnet 3.5
              </SelectItem>
              <SelectItem value='groq-llama-3.1-8b-instant'>
                Groq Llama 3.1 8B Instant
              </SelectItem>
              <SelectItem value='groq-llama-3.1-70b-versatile'>
                Groq Llama 3.1 70B Versatile
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => generateAIContent(v)}
          loading={loading}
        />
        {/* Output Section */}
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>사용량 초과</AlertDialogTitle>
            <AlertDialogDescription>
              AI 사용량이 한도를 초과했습니다. 계속하려면 결제 페이지로
              이동하세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push('/dashboard/billing')}
            >
              결제 페이지로 이동
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CreateNewContent
