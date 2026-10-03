import { isAxiosError } from 'axios'
import { useGameStore } from '~/stores/game'

export function useWaitlist() {
  const { t, locale } = useSiteI18n()
  const store = useGameStore()
  const email = ref('')
  const feedback = ref('')
  const feedbackType = ref<'success' | 'error' | ''>('')

  async function submit() {
    feedback.value = ''
    feedbackType.value = ''

    try {
      await store.joinWaitlist(email.value, locale.value)
      email.value = ''
      feedbackType.value = 'success'
      feedback.value = t('waitlist.success')
    }
    catch (error) {
      feedbackType.value = 'error'
      if (error instanceof Error && error.name === 'ValidationError') {
        feedback.value = t('waitlist.invalid')
      }
      else if (isAxiosError(error) && error.response?.status === 503) {
        feedback.value = t('waitlist.configError')
      }
      else if (isAxiosError(error) && error.response?.status === 502) {
        feedback.value = t('waitlist.deliveryError')
      }
      else {
        feedback.value = t('waitlist.error')
      }
    }
  }

  return { email, feedback, feedbackType, isSubmitting: computed(() => store.loading), submit }
}
