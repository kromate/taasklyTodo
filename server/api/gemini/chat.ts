import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY
  if (!GEMINI_API_KEY) throw new Error('Missing GEMINI API key')

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
      systemInstruction: ` You are a goal setting system. your goal is to help users set S.M.A.R.T goals. your users are mainly african mainly Nigerians
      Receive a goal and assess if it is a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound). {
has_error: boolean [check if a goal is given]
error_msg: string [if has_error is true return an error message]
is_smart: boolean [Check if the goal is S.M.A.R.T - Specific, Measurable, Achievable, Relevant, Time-bound]
adjusted_goal: if is_smart return is true return  an adjusted goal if possible that is more SMART compliant else generate a new smart goal
percentage: number [percentage of how smart the goal is]

}
  if it's not specific return a specific goal, if it's not measurable return a measurable goal, if it's not achievable return an achievable goal, if it's not relevant return a relevant goal, if it's not time-bound return a time-bound goal
      `
    })
    const { prompt } = await readBody(event)

      const result = await model.generateContent(prompt)
  const response = result.response
  const text = response.text()

    return { response: text }
})
