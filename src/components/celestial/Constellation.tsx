import React, { memo } from 'react'
import type { CelestialTimelineData, Person } from '../../types/celestial'
import { getYearPosition } from '../../utils/celestialMath'
import '../../styles/celestial.css'

interface ConstellationProps {
  data: CelestialTimelineData
  timelineHeight: number
  isActive: boolean // replaces current highlight logic
  onClick: (person: Person) => void
}

const Constellation: React.FC<ConstellationProps> = memo(({
  data,
  timelineHeight: _timelineHeight,
  isActive,
  onClick,
}) => {
  const { from: birthYear, to: deathYear, constellation, person } = data

  // Calculate star positions
  const birthY = getYearPosition(birthYear)
  const deathY = getYearPosition(deathYear)

  // Use same X position for both stars (vertical constellation)
  const starX = constellation.birthStar.x

  return (
    <div className="constellation" onClick={() => onClick(person)}>
      {/* Birth Star - Fixed large size, no blinking */}
      <div
        className={`constellation-star constellation-star--large constellation-star--birth ${
          isActive ? 'constellation-star--active' : ''
        }`}
        style={{
          '--constellation-color': constellation.color,
          'left': `${starX}%`,
          'top': `${birthY}px`,
        } as React.CSSProperties}
        role="button"
        tabIndex={0}
        aria-label={`Birth of ${person.desc} in ${birthYear}`}
      />

      {/* Death Star - Fixed large size, no blinking */}
      <div
        className={`constellation-star constellation-star--large constellation-star--death ${
          isActive ? 'constellation-star--active' : ''
        }`}
        style={{
          '--constellation-color': constellation.color,
          'left': `${starX}%`,
          'top': `${deathY}px`,
        } as React.CSSProperties}
        role="button"
        tabIndex={0}
        aria-label={`Death of ${person.desc} in ${deathYear}`}
      />

      {/* Lifespan Line - Connects birth and death stars vertically */}
      <div
        className={`constellation-lifeline ${isActive ? 'constellation-lifeline--active' : ''}`}
        style={{
          position: 'absolute',
          left: `${starX}%`,
          top: `${Math.min(birthY, deathY)}px`,
          width: '3px',
          height: `${Math.abs(deathY - birthY)}px`,
          background: `linear-gradient(to bottom, ${constellation.color}, ${constellation.color}88)`,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 1,
          borderRadius: '2px',
          '--constellation-color': constellation.color,
          '--lifeline-delay': `${(constellation.id.match(/\d+/)?.[0] || '0') * 0.2}s`, // Staggered delay based on constellation index
        } as React.CSSProperties}
      />

      {/* Constellation Label - Shows on hover */}
      <div
        className={`constellation-label ${isActive ? 'constellation-label--active' : ''}`}
        style={{
          position: 'absolute',
          left: `${starX + (constellation.side === 'left' ? 5 : -5)}%`,
          top: `${birthY + (deathY - birthY) / 2}px`,
          transform: 'translateY(-50%)',
          color: constellation.color,
          fontSize: '10px',
          fontWeight: 'bold',
          textShadow: `0 0 8px ${constellation.color}`,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: 'none',
          zIndex: 5,
          whiteSpace: 'nowrap',
        }}
      >
        {person.desc}
      </div>
    </div>
  )
})

Constellation.displayName = 'Constellation'

export default Constellation
