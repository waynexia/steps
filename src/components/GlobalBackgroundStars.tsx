import React, { memo } from 'react'

interface BackgroundStar {
  id: string
  x: number
  y: number
  size: 'small' | 'medium' | 'large'
  twinkleSpeed: 'slow' | 'medium' | 'fast'
  opacity: number
}

function generateStars(count: number): BackgroundStar[] {
  const sizes = ['small', 'medium', 'large'] as const
  const speeds = ['slow', 'medium', 'fast'] as const

  return Array.from({ length: count }, (_, i) => ({
    id: `star-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: sizes[Math.floor(Math.random() * sizes.length)],
    twinkleSpeed: speeds[Math.floor(Math.random() * speeds.length)],
    opacity: 0.3 + Math.random() * 0.7,
  }))
}

// Generate stars once, outside the component to prevent regeneration
const STARS = generateStars(250)

const GlobalBackgroundStars: React.FC = memo(() => {
  return (
    <div
      className="star-field"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      {STARS.map(star => (
        <div
          key={star.id}
          className={`star star--${star.size} star--twinkle-${star.twinkleSpeed}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
})

GlobalBackgroundStars.displayName = 'GlobalBackgroundStars'

export default GlobalBackgroundStars
