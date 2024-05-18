import * as cheerio from 'cheerio'
import wiki from 'wikipedia'

export async function fetch_people_in(year: number) {
  const page = await wiki.page(`AD_${year}`)
  const html = await page.html({ redirect: true })
  return extract_people_from_html(html)
}

export function extract_people_from_html(html: string) {
  const $ = cheerio.load(html)
  const birthsHeader = $('#Births').parent()
  const births = birthsHeader.nextUntil('h2').find('li').map((_, el) => {
    const desc = $(el).text()
    const link = $(el).find('a').attr('href')
    const deathMatch = desc.match(/\(d\. \d+/i)?.[0]
    const death = deathMatch ? Number.parseInt(deathMatch.substring(3)) : undefined
    return { desc, link, death }
  }).get()

  return births
}
