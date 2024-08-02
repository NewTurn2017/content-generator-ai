'use client'

import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import Prism from 'prismjs'

import { Editor } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { Copy, CheckCheck, Check } from 'lucide-react'

interface Props {
  aiOutput: string
  onOutputChange: (newOutput: string) => void
}

const OutputSection = ({ aiOutput, onOutputChange }: Props) => {
  const editorRef = useRef<Editor>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [editType, setEditType] = useState<'wysiwyg' | 'markdown'>('wysiwyg')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(aiOutput)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }

  const handleEditorChange = () => {
    const editorInstance = editorRef.current?.getInstance()
    if (editorInstance) {
      const newContent = editorInstance.getMarkdown()
      onOutputChange(newContent)
    }
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

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
  ]

  return (
    <div className='bg-white shadow-lg border'>
      <div className='flex justify-between items-center p-4'>
        <h2 className='font-medium text-lg'>컨텐츠 미리보기</h2>
        <div className='flex space-x-2'>
          <Button onClick={handleCopy} disabled={isCopied}>
            {isCopied ? (
              <Check className='w-4 h-4 mr-2' />
            ) : (
              <Copy className='w-4 h-4 mr-2' />
            )}
            {isCopied ? '복사 완료' : '복사'}
          </Button>
        </div>
      </div>
      <Editor
        ref={editorRef}
        initialEditType={editType}
        previewStyle='vertical'
        height='600px'
        initialValue={aiOutput}
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        toolbarItems={toolbarItems}
        onChange={handleEditorChange}
        hooks={{
          addImageBlobHook: (blob: any, callback: any) => {
            // 이미지 업로드 로직을 여기에 구현
            // 예: 서버에 이미지를 업로드하고 URL을 반환
            // callback(이미지URL)을 호출하여 에디터에 이미지 삽입
          },
        }}
      />
    </div>
  )
}

export default OutputSection
