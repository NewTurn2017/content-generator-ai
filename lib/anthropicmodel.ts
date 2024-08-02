// type

// types/aiResponseTypes.ts

// 내부에서 사용할 Block 타입들 (변경 없음)
export interface TextBlock {
  type: 'text'
  content: string
}

export interface ImageBlock {
  type: 'image'
  url: string
}

export interface CodeBlock {
  type: 'code'
  language: string
  content: string
}

export interface ToolUseBlock {
  type: 'tool'
  tool: string
  input: string
  output: string
}

export type Block = TextBlock | ImageBlock | CodeBlock | ToolUseBlock

export interface AIResponse {
  blocks: Block[]
}

// Claude API 관련 타입
export interface ClaudeContentBlock {
  type: 'text' | 'image'
  text?: string
  source?: string
}

export interface ClaudeMessage {
  id: string
  role: 'assistant' | 'user'
  content: ClaudeContentBlock[]
  model: string
  stop_reason: string | null
  stop_sequence: string | null
  usage: {
    input_tokens: number
    output_tokens: number
  }
}

export interface ClaudeResponse {
  id: string
  type: 'message'
  role: 'assistant'
  content: ClaudeContentBlock[]
  model: string
  stop_reason: string | null
  stop_sequence: string | null
  usage: {
    input_tokens: number
    output_tokens: number
  }
}

// Claude 응답을 문자열로 변환하는 유틸리티 함수
export function convertClaudeResponseToString(
  claudeResponse: ClaudeResponse
): string {
  return claudeResponse.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text || '')
    .join('\n\n')
}
