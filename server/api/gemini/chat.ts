import { GoogleGenerativeAI } from '@google/generative-ai'
import { systemPrompts } from './system_prompt'


const rateLimitStore = new Map()

// Rate limit configuration
const RATE_LIMIT = 1 // requests
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

function getRateLimitKey(ip:string) {
  return `rate_limit:${ip}`
}

function isRateLimited(ip:string) {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const userRequests = rateLimitStore.get(key) || []

  // Remove old requests
  const recentRequests = userRequests.filter((timestamp:number) => now - timestamp < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= RATE_LIMIT) {
    return true
  }

  // Add current request
  recentRequests.push(now)
  rateLimitStore.set(key, recentRequests)

  return false
}



export default defineEventHandler(async (event) => {
  try {
      // Get user's IP address
    const ip = event.node.req.headers['x-forwarded-for'] as string || event.node.req.socket.remoteAddress as string

    // Check rate limit
    if (isRateLimited(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.'
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
        statusMessage: error.message,
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
