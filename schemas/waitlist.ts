import * as yup from 'yup'

export const waitlistSchema = yup.object({
  email: yup.string().trim().email().required().max(254),
  locale: yup.mixed<'uk' | 'en'>().oneOf(['uk', 'en']).default('uk'),
})
