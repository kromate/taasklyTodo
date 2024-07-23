import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY
  if (!GEMINI_API_KEY) throw new Error('Missing GEMINI API key')

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: 'You are personal assistant, that helps people with achieving their goals. if a user gives you something that is not a goal, ask for a goal and if it`s a goal check if it`s SMART else sugguest ways to make it SMART.'
    })
    const { prompt } = await readBody(event)

      const result = await model.generateContent(prompt)
  const response = result.response
  const text = response.text()

    return { response: text }
})
