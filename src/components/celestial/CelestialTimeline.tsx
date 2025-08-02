import React, { useMemo } from 'react'
import type { CelestialTimelineData, TimelineSpine } from '../../types/celestial'
import { getYearPosition } from '../../utils/celestialMath'
import { assignColorByName } from '../../utils/colorPalette'
import Constellation from './Constellation'
import '../../styles/celestial.css'

interface CelestialTimelineProps {
  list: any[]
  currentTimelineHighlight: number
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void
  endYear: number
  currentIndex: number
}

const CelestialTimeline = React.forwardRef<HTMLDivElement, CelestialTimelineProps>(({
  list,
  currentTimelineHighlight,
  handleScroll,
  endYear,
  currentIndex,
}, ref) => {
  const redundant = 3
  const timelineHeight = (endYear + redundant) * 10 // 10px per year

  // Create timeline spine similar to original table approach
  const timelineSpine: TimelineSpine[] = useMemo(() => {
    const spine = Array.from({ length: endYear + redundant }, (_, year) => ({
      year,
      hasConstellation: false,
      constellationIds: [] as string[],
      shouldShowYear: false,
    }))

    // Mark important years
    spine[0].shouldShowYear = true
    spine[endYear].shouldShowYear = true

    // Process each person/constellation
    list.forEach((item, index) => {
      const constellationId = `constellation-${index}`

      // Mark years covered by this constellation
      for (let year = item.from; year <= item.to; year++) {
        if (year <= endYear) {
          spine[year].hasConstellation = true
          spine[year].constellationIds.push(constellationId)
        }
      }

      // Mark birth and death years for display
      if (item.from <= endYear)
        spine[item.from].shouldShowYear = true
      if (item.to <= endYear)
        spine[item.to].shouldShowYear = true
    })

    return spine
  }, [list, endYear])

  // Transform list data into celestial timeline data with overlapping approach
  const celestialData: CelestialTimelineData[] = useMemo(() => {
    return list.map((item, index) => {
      const personName = item.person?.desc || `Person ${index}`
      const color = assignColorByName(personName)

      // Alternate sides for overlapping effect
      const side = index % 2 === 0 ? 'left' : 'right'

      // Position stars on alternating sides of central spine
      const birthX = side === 'left' ? 35 : 65 // 35% or 65% from left
      const deathX = birthX // Same X for vertical constellation

      return {
        ...item,
        constellation: {
          id: `constellation-${index}`,
          color,
          birthStar: {
            x: birthX,
            y: getYearPosition(item.from),
            size: 'large' as const, // Fixed large size
          },
          deathStar: {
            x: deathX,
            y: getYearPosition(item.to),
            size: 'large' as const, // Fixed large size
          },
          isActive: index === currentIndex,
          isSelected: false,
          side,
        },
      }
    })
  }, [list, currentIndex])

  const handleConstellationClick = (_person: any) => {
    // TODO: Implement proper constellation selection
  }

  if (list.length === 0)
    return <div className="timeline">Loading celestial timeline...</div>

  return (
    <div className="timeline celestial-timeline" onScroll={handleScroll} ref={ref}>
      <h3 className="sticky">Timeline</h3>
      <h3> - </h3>
      <div
        className="celestial-timeline-container"
        style={{
          position: 'relative',
          height: `${timelineHeight}px`,
          width: '100%',
        }}
      >
        {/* Central Timeline Spine */}
        <div
          className="timeline-spine"
          style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            width: '4px',
            height: `${timelineHeight}px`,
            background: 'linear-gradient(to bottom, #64ffda 0%, #3742fa 50%, #64ffda 100%)',
            transform: 'translateX(-50%)',
            zIndex: 1,
            opacity: 0.6,
          }}
        />

        {/* Year Labels */}
        {timelineSpine
          .filter(spinePoint => spinePoint.shouldShowYear)
          .map(({ year }) => (
            <div
              key={`year-${year}`}
              className={`year-label ${[0, 500, 1000, 1500, 2000].includes(year) ? 'year-label--milestone' : ''}`}
              style={{
                position: 'absolute',
                top: `${getYearPosition(year)}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(10, 10, 15, 0.8)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {year}
            </div>
          ))}

        {/* Comet (Year Marker) - Travels ON the central spine */}
        <div
          className="comet-head"
          style={{
            position: 'absolute',
            top: `${getYearPosition(currentTimelineHighlight)}px`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
          }}
        />

        {/* Constellations */}
        {celestialData.map(data => (
          <Constellation
            key={data.constellation.id}
            data={data}
            timelineHeight={timelineHeight}
            isActive={data.constellation.isActive}
            onClick={handleConstellationClick}
          />
        ))}

        {/* Timeline coverage indicators (subtle background for uncovered years) */}
        {timelineSpine
          .reduce((gaps: { start: number, end: number }[], spinePoint, index) => {
            if (!spinePoint.hasConstellation && index > 0) {
              const lastGap = gaps[gaps.length - 1]
              if (lastGap && lastGap.end === index - 1)
                lastGap.end = index
              else
                gaps.push({ start: index, end: index })
            }
            return gaps
          }, [])
          .filter(gap => gap.end - gap.start > 5) // Only show gaps > 5 years
          .map(gap => (
            <div
              key={`gap-${gap.start}-${gap.end}`}
              className="timeline-gap"
              style={{
                position: 'absolute',
                left: '48%',
                top: `${getYearPosition(gap.start)}px`,
                width: '4%',
                height: `${getYearPosition(gap.end) - getYearPosition(gap.start)}px`,
                backgroundColor: '#1a1a2e',
                opacity: 0.3,
                zIndex: 0,
              }}
              title={`Uncovered years: ${gap.start} - ${gap.end}`}
            />
          ))}
      </div>
    </div>
  )
})

CelestialTimeline.displayName = 'CelestialTimeline'

export default CelestialTimeline
