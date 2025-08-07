/**
 * Coordinate calculations for the celestial timeline
 */

/**
 * Timeline layout configuration
 */
export const TIMELINE_CONFIG = {
  PIXELS_PER_YEAR: 10,
  CENTRAL_SPINE_POSITION: 50, // Percentage
  LEFT_CONSTELLATION_X: 40,   // Percentage - Moved closer to center
  RIGHT_CONSTELLATION_X: 60,  // Percentage - Moved closer to center
  SPINE_WIDTH: 4,             // Pixels
} as const

/**
 * Maps a year to its Y-coordinate position on the timeline
 * Each year takes 10px height to maintain compatibility with the original table-based approach
 */
export function getYearPosition(year: number): number {
  return year * TIMELINE_CONFIG.PIXELS_PER_YEAR
}

/**
 * Get X position for constellation stars based on alternating sides
 */
export function getConstellationXPosition(index: number): number {
  return index % 2 === 0 
    ? TIMELINE_CONFIG.LEFT_CONSTELLATION_X 
    : TIMELINE_CONFIG.RIGHT_CONSTELLATION_X
}