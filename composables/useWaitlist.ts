import { useGameStore } from '~/stores/game'

export function useWaitlist() {
  const { t } = useSiteI18n()
  const store = useGameStore()
  const email = ref('')
  const feedback = ref('')
  const feedbackType = ref<'success' | 'error' | ''>('')

  async function submit() {
    feedback.value = ''
    feedbackType.value = ''

    try {
      await store.joinWaitlist(email.value)
      email.value = ''
      feedbackType.value = 'success'
      feedback.value = t('waitlist.success')
    }
    catch (error) {
      feedbackType.value = 'error'
      feedback.value = error instanceof Error && error.name === 'ValidationError'
        ? t('waitlist.invalid')
        : t('waitlist.error')
    }
  }

  return { email, feedback, feedbackType, isSubmitting: computed(() => store.loading), submit }
}
