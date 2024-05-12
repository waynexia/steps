import axios from 'axios'
import * as cheerio from 'cheerio'

// const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org'
const WIKIPEDIA_AD_URL = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/AD_'

export async function fetch_people_in(year: number) {
  return axios.get(WIKIPEDIA_AD_URL + year).then((response) => {
    const $ = cheerio.load(response.data)
    const birthsHeader = $('#Births').parent()
    const births = birthsHeader.nextUntil('h2').find('li').map((_, el) => {
      const desc = $(el).text()
      const link = $(el).find('a').attr('href')
      const deathMatch = desc.match(/\(d\. \d+/i)?.[0]
      const death = deathMatch ? Number.parseInt(deathMatch.substring(3)) : undefined
      return { desc, link, death }
    },
    ).get()
    return births
  })
}
