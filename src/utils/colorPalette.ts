/**
 * Color assignment algorithm for historical figures
 * Generates vibrant, distinct colors for each figure
 */
export const CELESTIAL_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
  '#F7DC6F', // Gold
  '#BB8FCE', // Lavender
  '#85C1E9', // Sky Blue
  '#F8C471', // Orange
  '#82E0AA', // Light Green
  '#F1948A', // Salmon
  '#85D1C7', // Aqua
  '#D7DBDD', // Silver
] as const

/**
 * Assigns a unique color to a historical figure based on their index
 */
export function assignColor(index: number): string {
  return CELESTIAL_COLORS[index % CELESTIAL_COLORS.length]
}

/**
 * Generates a vibrant color with good contrast for celestial theme
 */
export function generateCelestialColor(seed: string): string {
  // Simple hash function for consistent color generation
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }

  // Generate vibrant colors with good saturation and lightness
  const hue = Math.abs(hash % 360)
  const saturation = 70 + (Math.abs(hash >> 8) % 30) // 70-100%
  const lightness = 50 + (Math.abs(hash >> 16) % 20) // 50-70%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
