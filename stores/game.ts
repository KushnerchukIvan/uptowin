import { defineStore } from 'pinia'
import { api } from '../services/api'
import { waitlistSchema } from '../schemas/waitlist'

export const useGameStore = defineStore('game', () => {
  const loading = ref(false)

  async function joinWaitlist(email: string, locale: 'uk' | 'en') {
    const payload = await waitlistSchema.validate({ email, locale }, { abortEarly: false })
    loading.value = true
    try {
      await api.post('/waitlist', payload)
    }
    finally {
      loading.value = false
    }
  }

  return { loading, joinWaitlist }
})
