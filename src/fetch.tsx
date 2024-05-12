import axios from 'axios'
// import * as htmlparser2 from 'htmlparser2'
import * as cheerio from 'cheerio'

const WIKIPEDIA_AD_URL = 'https://en.wikipedia.org/wiki/AD_'

export async function fetch_people_in(year: number) {
  return axios.get(WIKIPEDIA_AD_URL + year).then((response) => {
    // const dom = htmlparser2.parseDOM(response.data)
    const $ = cheerio.load(response.data)
    const birthsHeader = $('h2').filter((_, el) => $(el).text() === 'Births')
    const birthsList = birthsHeader.nextAll('ul, ol').first()
    const births = birthsList.find('li').map((_, el) => $(el).text()).get()
    return births
  })
}
