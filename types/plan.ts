export type PlanInterval = 'month' | 'year'

export interface Plan {
  name: string
  price: number
  interval: PlanInterval
  priceId: string
  features: readonly string[]
}
