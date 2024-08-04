import * as cheerio from 'cheerio'
import wiki from 'wikipedia'

export async function fetch_people_in(year: number) {
  const page = await wiki.page(`AD_${year}`, { preload: true, fields: ['html'] })
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

// Link like '/wiki/Ptolemy'
export async function person_detail(link: string) {
  console.log(link)
  const page = await wiki.page(link.substring(6), { autoSuggest: false, preload: true, fields: ['summary', 'intro', 'images'] })
  // const imageUrl = (await page.images({ redirect: true, limit: 10 })).at(0)?.url
  const image = (await page.images({ redirect: true, limit: 10 })).filter((result, _) => {
    return result.title.match(page.title) && result.url.endsWith('.jpg')
  })
  const intro = (await page.intro()).replace('\n', '\n\n')
  return { title: page.title, intro, imageUrl: image.at(0)?.url, imageTitle: image.at(0)?.title }
}
