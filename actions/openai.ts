'use server'

import openai from '@/lib/openaimodel'

export async function openaiChatCompletion(
  prompt: string,
  model: 'gpt-4o' | 'gpt-4o-mini'
) {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
    })
    return response.choices[0].message.content
  } catch (error) {
    console.error('AI 콘텐츠 생성 중 오류:', error)
    return { success: false, error: 'AI 콘텐츠 생성 중 오류가 발생했습니다.' }
  }
}
