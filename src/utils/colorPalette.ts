/**
 * Color assignment algorithm for historical figures
 * Generates vibrant, distinct colors for each figure
 * Enhanced celestial color palette with 12+ vibrant colors
 */
export const CELESTIAL_COLORS = [
  '#64ffda', // cyan - primary celestial color
  '#ff6b9d', // pink
  '#f7b731', // yellow
  '#3742fa', // blue
  '#2ed573', // green
  '#ff4757', // red
  '#a4b0be', // gray-blue
  '#7bed9f', // mint
  '#70a1ff', // light blue
  '#5352ed', // purple
  '#ff9ff3', // light pink
  '#ffb8b8', // salmon
  '#74b9ff', // bright blue
  '#fd79a8', // hot pink
  '#fdcb6e', // orange
  '#6c5ce7', // violet
  '#a29bfe', // periwinkle
  '#fd79a8', // magenta
  '#00b894', // teal
  '#e17055', // coral
] as const

/**
 * Assigns a unique color to a historical figure based on their index
 * Ensures consistent color assignment across renders
 */
export function assignColor(index: number): string {
  return CELESTIAL_COLORS[index % CELESTIAL_COLORS.length]
}

/**
 * Generates a constellation color based on person's name for consistency
 * Uses hash of name to ensure same person always gets same color
 */
export function assignColorByName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  const colorIndex = Math.abs(hash) % CELESTIAL_COLORS.length
  return CELESTIAL_COLORS[colorIndex]
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
