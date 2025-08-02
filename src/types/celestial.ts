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
