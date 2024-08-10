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
  const births = birthsHeader.nextUntil('h2').find('li').filter(function (_, _el) {
    return $(this).find('li').length === 0
  }).map((_, el) => {
    const desc = $(el).text()
    const links = $(el).find('a')
    if (links.length > 1) {
      links.filter(function (_, _el) {
        const matches = $(this).text().match(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i)
        return matches === null || matches!.length === 0
      })
    }
    const link = links.attr('href')
    const deathMatch = desc.match(/\(d\.( AD)? (\d+)/i)?.[2]
    const death = deathMatch ? Number.parseInt(deathMatch) : undefined
    return { desc, link, death }
  }).get()

  return births.filter(
    (item, _) => item.link?.startsWith('/wiki/'),
  )
}

// Link like '/wiki/Ptolemy'
export async function person_detail(link: string) {
  console.log(link)
  const page = await wiki.page(link.substring(6), { autoSuggest: false, preload: true, fields: ['summary', 'intro', 'images'] })
  const image = (await page.images({ redirect: true, limit: 10 })).filter((result, _) => {
    const words = page.title.split(' ')
    const regex = new RegExp(words.join('|'), 'i')
    return result.title.match(regex) && result.url.endsWith('.jpg')
  })
  const intro = (await page.intro()).replace('\n', '\n\n')
  return { title: page.title, intro, imageUrl: image.at(0)?.url, imageTitle: image.at(0)?.title }
}
