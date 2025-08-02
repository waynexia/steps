import { useCallback, useEffect, useState } from 'react'
import type { BackgroundStar } from '../../types/celestial'
import '../../styles/celestial.css'

interface BackgroundStarsProps {
  starCount?: number
}

const BackgroundStars: React.FC<BackgroundStarsProps> = ({
  starCount = 200,
}) => {
  const [stars, setStars] = useState<BackgroundStar[]>([])

  // Generate random stars
  const generateStar = useCallback((id: string): BackgroundStar => {
    const maxTwinkles = 3 + Math.floor(Math.random() * 5) // 3-7 twinkles

    return {
      id,
      x: Math.random() * 100, // Percentage
      y: Math.random() * 100, // Percentage
      size: Math.floor(Math.random() * 3), // 0, 1, 2
      opacity: 0.3 + Math.random() * 0.7, // 0.3 to 1.0
      twinkleSpeed: Math.floor(Math.random() * 3), // 0, 1, 2
      twinkleCount: 0,
      maxTwinkles,
      isDisappearing: false,
    }
  }, [])

  // Initialize star field
  useEffect(() => {
    const initialStars = Array.from({ length: starCount }, (_, index) =>
      generateStar(`star-${index}`))
    setStars(initialStars)
  }, [starCount, generateStar])

  // Star lifecycle - track twinkle count and manage finite twinkling
  useEffect(() => {
    const interval = setInterval(() => {
      setStars((currentStars) => {
        const newStars = [...currentStars]

        // Check for stars that have completed their twinkle cycles
        const starsToUpdate = newStars.map((star) => {
          if (!star.isDisappearing && (star.twinkleCount || 0) >= star.maxTwinkles!)
            return { ...star, isDisappearing: true }
          return star
        })

        // Remove disappeared stars and add new ones
        const activeStars = starsToUpdate.filter((star) => {
          if (star.isDisappearing) {
            // 30% chance to remove disappeared star each check
            return Math.random() > 0.3
          }
          return true
        })

        // Add new stars if we're below target count
        while (activeStars.length < starCount && Math.random() < 0.3) {
          const newStar = generateStar(`star-${Date.now()}-${Math.random()}`)
          activeStars.push(newStar)
        }

        return activeStars
      })
    }, 3000) // Check every 3 seconds

    return () => clearInterval(interval)
  }, [starCount, generateStar])

  const getSizeClass = (size: number): string => {
    const sizes = ['star--small', 'star--medium', 'star--large']
    return sizes[size] || sizes[0]
  }

  const getColorClass = (colorIndex: number): string => {
    const colors = ['', 'star--blue', 'star--yellow', 'star--red']
    return colors[colorIndex] || ''
  }

  const getTwinkleClass = (speedIndex: number): string => {
    const speeds = ['star--twinkle-slow', 'star--twinkle-medium', 'star--twinkle-fast']
    return speeds[speedIndex] || speeds[0]
  }

  return (
    <div className="star-field">
      {stars.map((star) => {
        const sizeClass = getSizeClass(star.size)
        const colorClass = getColorClass(star.size)
        const twinkleClass = getTwinkleClass(star.twinkleSpeed)
        const disappearingClass = star.isDisappearing ? 'star--disappearing' : ''

        // Calculate twinkle iterations based on remaining twinkles
        const remainingTwinkles = Math.max(0, star.maxTwinkles! - (star.twinkleCount || 0))

        return (
          <div
            key={star.id}
            className={`star ${sizeClass} ${colorClass} ${twinkleClass} ${disappearingClass}`.trim()}
            style={{
              'left': `${star.x}%`,
              'top': `${star.y}%`,
              '--target-opacity': star.opacity,
              '--twinkle-iterations': remainingTwinkles,
              'animationDelay': `${Math.random() * 3}s`,
            } as React.CSSProperties}
          />
        )
      })}
    </div>
  )
}

export default BackgroundStars
