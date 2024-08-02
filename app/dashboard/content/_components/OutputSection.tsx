'use client'

import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface Props {
  aiOutput: string
}

const OutputSection = ({ aiOutput }: Props) => {
  const editorRef = useRef<Editor>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(aiOutput)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance()
    if (editorInstance && typeof aiOutput === 'string') {
      try {
        editorInstance.setMarkdown(aiOutput)
      } catch (error) {
        console.error('마크다운 설정 중 오류:', error)
        editorInstance.setMarkdown('마크다운 설정 중 오류가 발생했습니다.')
      }
    }
  }, [aiOutput])

  return (
    <div className='bg-white shadow-lg border'>
      <div className='flex justify-between items-center p-4'>
        <h2 className='font-medium text-lg'>컨텐츠 미리보기</h2>
        <Button onClick={handleCopy} disabled={isCopied}>
          {isCopied ? (
            <Check className='w-4 h-4 mr-2' />
          ) : (
            <Copy className='w-4 h-4 mr-2' />
          )}
          {isCopied ? '복사 완료' : '복사'}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialEditType='wysiwyg'
        height='600px'
        useCommandShortcut={true}
      />
    </div>
  )
}

export default OutputSection
