import { createChatSession } from '@/utils/AIModal'

export async function geminiChatCompletion(
  prompt: string,
  modelName: 'gemini-1.5-flash' | 'gemini-1.5-pro'
) {
  try {
    const result = await createChatSession(modelName).sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    if (!text) {
      throw new Error('응답 텍스트가 없습니다.')
    }
    return text
  } catch (error) {
    console.error('Gemini 콘텐츠 생성 중 오류:', error)
    return '죄송합니다. AI 콘텐츠 생성 중 오류가 발생했습니다.'
  }
}
