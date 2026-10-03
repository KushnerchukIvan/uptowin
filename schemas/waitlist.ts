import * as yup from 'yup'

export const waitlistSchema = yup.object({
  email: yup.string().trim().email().required().max(254),
})
