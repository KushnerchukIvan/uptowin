export type FeatureId = 'world' | 'friends' | 'progress'
export type StepId = 'character' | 'crew' | 'adventure'

export interface FeatureCardData {
  id: FeatureId
  icon: 'planet' | 'crew' | 'sync'
  index: string
  title: string
  body: string
  tag: string
}

export interface JourneyStepData {
  id: StepId
  title: string
  body: string
}
