/**
 * Coordinate calculations and year-to-position mapping for the 2,500-year timeline
 */

export interface TimelineConfig {
  startYear: number
  endYear: number
  timelineHeight: number
  containerHeight: number
}

/**
 * Maps a year to its Y-coordinate position on the timeline
 */
export function yearToYPosition(
  year: number,
  config: TimelineConfig,
): number {
  const { startYear, endYear, timelineHeight } = config
  const totalYears = endYear - startYear
  const yearOffset = year - startYear

  // Linear mapping from year to Y position
  return (yearOffset / totalYears) * timelineHeight
}

/**
 * Maps a Y-coordinate position to its corresponding year
 */
export function yPositionToYear(
  yPosition: number,
  config: TimelineConfig,
): number {
  const { startYear, endYear, timelineHeight } = config
  const totalYears = endYear - startYear

  // Linear mapping from Y position to year
  const yearOffset = (yPosition / timelineHeight) * totalYears
  return Math.round(startYear + yearOffset)
}

/**
 * Calculates the lifespan line length for a historical figure
 */
export function calculateLifespanLength(
  birthYear: number,
  deathYear: number,
  config: TimelineConfig,
): number {
  const birthY = yearToYPosition(birthYear, config)
  const deathY = yearToYPosition(deathYear, config)
  return Math.abs(deathY - birthY)
}

/**
 * Generates constellation coordinates for a historical figure
 */
export function generateConstellationCoords(
  birthYear: number,
  deathYear: number,
  index: number,
  config: TimelineConfig,
): {
    birthStar: { x: number, y: number }
    deathStar: { x: number, y: number }
    lineLength: number
  } {
  const centerX = 50 // Center of timeline (percentage)
  const offsetX = (index % 2 === 0) ? -15 : 15 // Alternate left/right

  const birthY = yearToYPosition(birthYear, config)
  const deathY = yearToYPosition(deathYear, config)

  return {
    birthStar: {
      x: centerX + offsetX,
      y: birthY,
    },
    deathStar: {
      x: centerX + offsetX,
      y: deathY,
    },
    lineLength: Math.abs(deathY - birthY),
  }
}
