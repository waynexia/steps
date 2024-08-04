export function wikipedia_link_of_year(year: number) {
  return `https://wikipedia.org/wiki/AD_${year}`
}

export function wikipedia_link_of_page(relative_path: string) {
  return `https://wikipedia.org${relative_path}`
}
