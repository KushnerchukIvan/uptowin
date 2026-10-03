import { createError, getRequestURL, readBody } from 'h3'
import { waitlistSchema } from '../../schemas/waitlist'

interface EmailJsErrorResponse {
  status?: number
  text?: string
}

function getNetworkErrorCode(error: unknown) {
  if (error && typeof error === 'object' && 'cause' in error) {
    const cause = error.cause
    if (cause && typeof cause === 'object' && 'code' in cause && typeof cause.code === 'string') {
      return cause.code
    }
  }

  return 'unknown'
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let signup: Awaited<ReturnType<typeof waitlistSchema.validate>>

  try {
    signup = await waitlistSchema.validate(body, { abortEarly: false })
  }
  catch {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid email address.' })
  }

  const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = useRuntimeConfig(event)

  if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'EmailJS is not configured. Set its service ID, template ID, and public key.',
    })
  }

  const isUkrainian = signup.locale === 'uk'
  const subject = isUkrainian
    ? 'Frontend Developer — Іван Кушнерчук | Портфоліо'
    : 'Frontend Developer — Ivan Kushnerchuk | Portfolio'
  const portfolioUrl = getRequestURL(event).origin
  const message = isUkrainian
    ? [
        'Вітаю!',
        '',
        'Мене звати Іван Кушнерчук. Я frontend-розробник і шукаю можливість приєднатися до команди.',
        '',
        'У своєму портфоліо-проєкті Uptowin я реалізував адаптивний інтерфейс на Vue 3, Nuxt 3 і TypeScript, анімації GSAP, локалізацію, керування станом та інтеграцію API.',
        '',
        '',
        'Буду радий коротко розповісти про проєкт і обговорити, чим можу бути корисним вашій команді.',
        '',
        'З повагою,',
        'Іван Кушнерчук',
        'ikushnerchuk2005@gmail.com',
      ].join('\n')
    : [
        'Hello,',
        '',
        'My name is Ivan Kushnerchuk, and I’m a frontend developer looking for an opportunity to join a product team.',
        '',
        'In my Uptowin portfolio project, I built a responsive interface with Vue 3, Nuxt 3, and TypeScript, GSAP animations, localization, state management, and API integration.',
        '',
        '',
        'I’d be glad to walk you through the project and discuss how I could contribute to your team.',
        '',
        'Best regards,',
        'Ivan Kushnerchuk',
        'ikushnerchuk2005@gmail.com',
      ].join('\n')

  let response: Response

  try {
    const siteOrigin = getRequestURL(event).origin
    response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': siteOrigin,
      },
      body: JSON.stringify({
        service_id: emailjsServiceId,
        template_id: emailjsTemplateId,
        user_id: emailjsPublicKey,
        template_params: {
          to_email: signup.email,
          subject,
          message,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    })
  }
  catch (error) {
    console.error(`[waitlist] EmailJS connection failed (code=${getNetworkErrorCode(error)}).`)
    throw createError({ statusCode: 502, statusMessage: 'Could not connect to the email provider.' })
  }

  if (!response.ok) {
    const responseText = await response.text().catch(() => '')
    let result: EmailJsErrorResponse = {}

    try {
      result = JSON.parse(responseText) as EmailJsErrorResponse
    }
    catch {
      // EmailJS may return a plain-text error instead of JSON.
    }

    const errorDetail = (result.text ?? responseText).replace(/[\r\n]/g, ' ').slice(0, 180) || 'unknown'
    console.error(`[waitlist] EmailJS rejected the message (HTTP ${response.status}, status=${result.status ?? 'unknown'}, detail=${errorDetail}).`)
    throw createError({ statusCode: 502, statusMessage: 'EmailJS could not send the message.' })
  }

  return { ok: true }
})
