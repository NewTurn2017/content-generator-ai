const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require('@google/generative-ai')

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

const getModel = (modelName: 'gemini-1.5-flash' | 'gemini-1.5-pro') => {
  return genAI.getGenerativeModel({
    model: modelName,
    safetySettings,
  })
}

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
}

export const createChatSession = (
  modelName: 'gemini-1.5-flash' | 'gemini-1.5-pro'
) => {
  const model = getModel(modelName)
  return model.startChat({
    generationConfig,
    history: [],
  })
}
