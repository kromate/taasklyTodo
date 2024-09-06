import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  // Load environment variables
  const clientId = import.meta.env.G_AUTH_CLIENT_ID
  const clientSecret = import.meta.env.G_AUTH_CLIENT_SECRET

  const cookies = parseCookies(event).currentGoogleCalToken
  if (!cookies) {
    throw createError({ statusCode: 401, message: 'No token found, Connect your google calendar' })
  }
  const googleCalendar = JSON.parse(cookies)

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret)
  oAuth2Client.setCredentials({
    access_token: googleCalendar.access_token,
    refresh_token: googleCalendar.refresh_token,
    expiry_date: googleCalendar.expiry_date
  })

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  // Get the month from the request query, or use the current month
  const query = getQuery(event)
  const requestedMonth = query.month ? parseInt(query.month as string) : null

  const now = new Date()
  const month = requestedMonth !== null ? requestedMonth - 1 : now.getMonth() // JavaScript months are 0-indexed
  const year = now.getFullYear()

  // Create date range for the specified month
  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59) // Last day of the month

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfMonth.toISOString(),
      timeMax: endOfMonth.toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 2500 // Increased to ensure we get all events for the month
    })


    return {
      statusCode: 200,
      data: response.data.items,
      month: month + 1, // Return 1-indexed month for clarity
      year
    }
  } catch (error: any) {
    throw createError({ statusCode: 401, message: error.message })
  }
})
