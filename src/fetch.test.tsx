import nock from 'nock'
import { fetch_people_in } from './fetch'

describe('fetch_people_in', () => {
  it('call fetch_people_in with 1990', async () => {
    const year = 1990
    // scraped from https://en.wikipedia.org/wiki/AD_100
    const mockData = `
<div>
    <ul><li>Appearance of the first <a href="/wiki/Christianity" title="Christianity">Christian</a> <a href="/wiki/Dogma" title="Dogma">dogma</a> and formulas regarding <a href="/wiki/Morality" title="Morality">morality</a>.</li>
    <li>The <a href="/wiki/Gospel_of_John" title="Gospel of John">Gospel of John</a> is widely believed to have been written around this date.<sup id="cite_ref-5" class="reference"><a href="#cite_note-5">[5]</a></sup></li>
    <li>The compilation of the <a href="/wiki/Kama_sutra" class="mw-redirect" title="Kama sutra">Kama sutra</a> begins in <a href="/wiki/Classical_India" class="mw-redirect" title="Classical India">India</a>.</li>
    <li>The Temple of the God of Medicine is built in <a href="/wiki/Anguo" title="Anguo">Anguo</a>, <a href="/wiki/China" title="China">China</a>.</li>
    <li>The <a href="/wiki/Buddhist_Councils" class="mw-redirect" title="Buddhist Councils">Fourth Buddhist Council</a> is convened c. this year.</li></ul>
    <h2><span class="mw-headline" id="Births">Births</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=AD_100&amp;action=edit&amp;section=10" title="Edit section: Births"><span>edit</span></a><span class="mw-editsection-bracket">]</span></span></h2>
    <ul><li><a href="/wiki/Fa_Zhen" title="Fa Zhen">Fa Zhen</a> (or <b>Gaoqing</b>), Chinese scholar (d. <a href="/wiki/188" title="188">188</a>)</li>
    <li><a href="/wiki/Faustina_the_Elder" title="Faustina the Elder">Faustina the Elder</a>, Roman empress</li>
    <li><a href="/wiki/Justin_Martyr" title="Justin Martyr">Justin Martyr</a>, Christian apologist and saint (approximate date)</li>
    <li><a href="/wiki/Marcus_Cornelius_Fronto" title="Marcus Cornelius Fronto">Marcus Cornelius Fronto</a>, Roman grammarian, rhetorician and advocate (d. <a href="/wiki/170" title="170">170</a>)</li>
    <li><a href="/wiki/Ptolemy" title="Ptolemy">Ptolemy</a>, Greek astrologer, astronomer, geographer and mathematician (d. 170)</li>
    <li><a href="/wiki/Junius_Rusticus" title="Junius Rusticus">Quintus Junius Rusticus</a>, Roman teacher and politician (approximate date)</li>
    <li><a href="/wiki/Quintus_Tineius_Sacerdos_Clemens" title="Quintus Tineius Sacerdos Clemens">Quintus Tineius Sacerdos Clemens</a>, Roman politician (approximate date)</li></ul>
    <h2><span class="mw-headline" id="Deaths">Deaths</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=AD_100&amp;action=edit&amp;section=11" title="Edit section: Deaths"><span>edit</span></a><span class="mw-editsection-bracket">]</span></span></h2>
    <ul><li><a href="/wiki/Herod_Agrippa_II" title="Herod Agrippa II">Agrippa II</a>, Jewish king of <a href="/wiki/Judea" title="Judea">Judea</a> (b. <a href="/wiki/AD_27" title="AD 27">AD 27</a>)</li>
    <li><a href="/wiki/Apollonius_of_Tyana" title="Apollonius of Tyana">Apollonius of Tyana</a>, Greek philosopher (b. <a href="/wiki/AD_15" title="AD 15">AD 15</a>)</li>
    <li><a href="/wiki/Josephus" title="Josephus">Josephus</a>, Jewish <a href="/wiki/Historian" title="Historian">historian</a> and writer (b. <a href="/wiki/AD_37" title="AD 37">AD 37</a>)</li>
    <li><a href="/wiki/John_the_Apostle" title="John the Apostle">John the Apostle</a> of <a href="/wiki/Jesus_Christ" class="mw-redirect" title="Jesus Christ">Jesus Christ</a> (approximate date, b. <a href="/wiki/AD_6" title="AD 6">AD 6</a>)</li>
    <li><a href="/wiki/Wang_Chong" title="Wang Chong">Wang Chong</a>, Chinese philosopher (b. <a href="/wiki/AD_27" title="AD 27">AD 27</a>)</li></ul>
</div>
`

    nock('https://en.wikipedia.org')
      .get(`/wiki/AD_${year}`)
      .reply(200, mockData)

    const result = await fetch_people_in(year)

    expect(result).toEqual(
      [{
        death: 188,
        desc: 'Fa Zhen (or Gaoqing), Chinese scholar (d. 188)',
        link: '/wiki/Fa_Zhen',
      }, {
        death: undefined,
        desc: 'Faustina the Elder, Roman empress',
        link: '/wiki/Faustina_the_Elder',
      }, {
        death: undefined,
        desc: 'Justin Martyr, Christian apologist and saint (approximate date)',
        link: '/wiki/Justin_Martyr',
      }, {
        death: 170,
        desc: 'Marcus Cornelius Fronto, Roman grammarian, rhetorician and advocate (d. 170)',
        link: '/wiki/Marcus_Cornelius_Fronto',
      }, {
        death: 170,
        desc: 'Ptolemy, Greek astrologer, astronomer, geographer and mathematician (d. 170)',
        link: '/wiki/Ptolemy',
      }, {
        death: undefined,
        desc: 'Quintus Junius Rusticus, Roman teacher and politician (approximate date)',
        link: '/wiki/Junius_Rusticus',
      }, {
        death: undefined,
        desc: 'Quintus Tineius Sacerdos Clemens, Roman politician (approximate date)',
        link: '/wiki/Quintus_Tineius_Sacerdos_Clemens',
      }],
    )
  })
})
