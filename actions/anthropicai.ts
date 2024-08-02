'use server'
import {
  AIResponse,
  ClaudeResponse,
  convertClaudeResponseToString,
} from '@/lib/anthropicmodel'

import Anthropic from '@anthropic-ai/sdk'

const apiKey = process.env.ANTHROPIC_API_KEY

if (!apiKey) {
  throw Error('ANTHROPIC_API_KEY is not set')
}

const anthropic = new Anthropic({
  apiKey,
})

export async function claudeChatCompletion(prompt: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 4096,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    })

    const claudeResponse: ClaudeResponse = response as unknown as ClaudeResponse

    return convertClaudeResponseToString(claudeResponse)
  } catch (error) {
    console.error('Claude 콘텐츠 생성 중 오류:', error)
    return 'AI 콘텐츠 생성 중 오류가 발생했습니다.'
  }
}
