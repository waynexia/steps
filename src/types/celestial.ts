export interface BackgroundStar {
  id: string
  x: number
  y: number
  size: number // 0, 1, 2 for small, medium, large
  opacity: number
  twinkleSpeed: number // 0, 1, 2 for slow, medium, fast
  twinkleCount?: number // Number of times this star has twinkled
  maxTwinkles?: number // Maximum twinkles before disappearing
  isDisappearing?: boolean // Whether star is in disappearing animation
}

export interface CelestialStar {
  x: number // horizontal position (percentage of timeline width)
  y: number // vertical position calculated from year
  size: 'large' // Fixed to large size, no blinking/disappearing
}

export interface Constellation {
  id: string
  color: string // unique vibrant color
  birthStar: CelestialStar
  deathStar: CelestialStar
  isActive: boolean // currently viewing this person
  isSelected: boolean // user has interacted with this constellation
  side: 'left' | 'right' // Which side of central timeline to render
}

export interface CelestialTimelineData {
  from: number // birth year (existing)
  to: number // death year (existing)
  person: any // existing person data
  person_detail: any // existing detail data
  other_people: any[] // existing other people data
  // New celestial properties
  constellation: Constellation
}

export interface TimelineSpine {
  year: number
  hasConstellation: boolean
  constellationIds: string[]
  shouldShowYear: boolean
}
