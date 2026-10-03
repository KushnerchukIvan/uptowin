import { createError, readBody } from 'h3'
import { waitlistSchema } from '../../schemas/waitlist'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const { email } = await waitlistSchema.validate(body, { abortEarly: false })
    return { ok: true, email }
  }
  catch {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid email address.' })
  }
})
