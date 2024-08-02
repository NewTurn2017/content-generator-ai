'use server'

import groq from '@/lib/groq'

export async function groqChatCompletion(
  prompt: string,
  model:
    | 'llama-3.1-8b-instant'
    | 'llama-3.1-70b-versatile'
    | 'llama-3.1-405b-reasoning'
) {
  try {
    const response = await await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: model,
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
      stream: false,
      stop: null,
    })
    return response.choices[0].message.content
  } catch (error) {
    console.error('AI 콘텐츠 생성 중 오류:', error)
    return { success: false, error: 'AI 콘텐츠 생성 중 오류가 발생했습니다.' }
  }
}
