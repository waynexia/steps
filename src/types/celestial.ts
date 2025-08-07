// Person data interfaces
export interface Person {
  desc: string
  link?: string
  death?: number
}

export interface PersonDetail {
  title: string
  intro: string
  imageUrl: string | null
  imageTitle: string | null
}

export interface TimelineItem {
  from: number
  to: number
  person: Person
  person_detail: PersonDetail
  other_people: Person[]
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
  side: 'left' | 'right' // Which side of central timeline to render
}

export interface CelestialTimelineData extends TimelineItem {
  constellation: Constellation
}

export interface TimelineSpine {
  year: number
  hasConstellation: boolean
  constellationIds: string[]
  shouldShowYear: boolean
}
