import type { FeatureCardData, JourneyStepData } from '~/types/site'

export const featureDefinitions: Omit<FeatureCardData, 'title' | 'body' | 'tag' | 'index'>[] = [
  { id: 'world', icon: 'planet' },
  { id: 'friends', icon: 'crew' },
  { id: 'progress', icon: 'sync' },
]

export const journeyStepIds: JourneyStepData['id'][] = ['character', 'crew', 'adventure']
