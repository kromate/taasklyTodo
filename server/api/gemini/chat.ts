import { GoogleGenerativeAI } from '@google/generative-ai'
import { systemPrompts } from './system_prompt'

export default defineEventHandler(async (event) => {
  try {
    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY
    if (!GEMINI_API_KEY) {
      throw new Error('Missing GEMINI API key')
    }

    const { prompt, promptType } = await readBody(event)
    if (!prompt || !promptType) {
      throw new Error('Missing required parameters: prompt or promptType')
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const systemInst = systemPrompts[promptType]
    if (!systemInst) {
      throw new Error(`Invalid promptType: ${promptType}`)
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
      systemInstruction: systemInst
    })

    const result = await model.generateContent(prompt)
    const response = result.response
    const gemini_response = response.text()

    return gemini_response
  } catch (error) {
    console.error('Error in Gemini API handler:', error)

    if (error instanceof Error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: error.message
      })
    } else {
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'An unexpected error occurred'
      })
    }
  }
})
