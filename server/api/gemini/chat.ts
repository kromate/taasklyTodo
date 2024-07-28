import { GoogleGenerativeAI } from '@google/generative-ai'
import { systemPrompts } from './utils/system_prompt'
import { isRateLimited } from './utils/rateLimit'
import { safetySetting } from './utils/safety'

// 'I want to find a romantic partner within the next 6 months by joining a dating app and attending social events.


export default defineEventHandler(async (event) => {
  try {
      // Get user's IP address
    const ip = event.node.req.headers['x-forwarded-for'] as string || event.node.req.socket.remoteAddress as string

    // Check rate limit
    if (isRateLimited(ip)) {
      throw createError({
        statusCode: 429,
        message: 'Too Many Requests'
      })
    }

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
      model: 'gemini-1.5-pro',
      generationConfig: { responseMimeType: 'application/json' },
      systemInstruction: systemInst,
      safetySettings: safetySetting
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
        message: error.message
      })
    } else {
      return createError({
        statusCode: 500,
        message: 'Internal Server Error'
      })
    }
  }
})
