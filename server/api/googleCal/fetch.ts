import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'



export default defineEventHandler(async (event) => {
  // Load environment variables
  const clientId = import.meta.env.VITE_G_AUTH_CLIENT_ID
  const clientSecret = import.meta.env.VITE_G_AUTH_CLIENT_SECRET


    const Cookies = parseCookies(event).currentGoogleCalToken

    const googleCalendar = JSON.parse(cookies)

    // console.log(googleCalIntegration)



    //     const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret)
    // oAuth2Client.setCredentials({
    //     // access_token: googleCalendar.access_token,
    //     // refresh_token: googleCalendar.refresh_token,
    //     // expiry_date: googleCalendar.expiry_date
    // })

    // const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    // calendar.events.list({
    //     calendarId: 'primary',
    //     maxResults: 2500
    // })


  // Return the authorization URL
  return { }
})
