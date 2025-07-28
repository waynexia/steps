import { describe, expect, it } from 'vitest'
import { extract_people_from_html } from './fetch'

describe('extract_people_from_html', () => {
  it('call extract_people_from_html with 100', async () => {
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
    const result = extract_people_from_html(mockData)

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

describe('extract_people_from_450', () => {
  it('should extract people from the HTML', () => {
    const mockData = `
    <h2><span class="mw-headline" id="Births">Births</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=AD_100&amp;action=edit&amp;section=10" title="Edit section: Births"><span>edit</span></a><span class="mw-editsection-bracket">]</span></span></h2>
    <ul><li><a href="/wiki/February_2" title="February 2">February 2</a> – <a href="/wiki/Justin_I" title="Justin I">Justin I</a>, <a href="/wiki/List_of_Byzantine_emperors" title="List of Byzantine emperors">Byzantine Emperor</a> (d. <a href="/wiki/527" title="527">527</a>)</li>
    <li><a href="/wiki/Ariadne_(empress)" title="Ariadne (empress)">Ariadne</a>, <a href="/wiki/List_of_Roman_and_Byzantine_Empresses" class="mw-redirect" title="List of Roman and Byzantine Empresses">Byzantine Empress</a> (approximate date)</li>
    <li><a href="/wiki/Avitus_of_Vienne" title="Avitus of Vienne">Avitus</a>, <a href="/wiki/Ancient_Diocese_of_Vienne" class="mw-redirect" title="Ancient Diocese of Vienne">archbishop of Vienne</a> (approximate date) (d. <a href="/wiki/518" title="518">518</a>)</li>
    <li><a href="/wiki/Chilperic_II_of_Burgundy" title="Chilperic II of Burgundy">Chilperic II</a>, king of <a href="/wiki/Kingdom_of_Burgundy" title="Kingdom of Burgundy">Burgundy</a> (approximate date)</li>
    <li><a href="/wiki/Gunthamund" title="Gunthamund">Gunthamund</a>, king of the <a href="/wiki/Vandals" title="Vandals">Vandals</a> (d. <a href="/wiki/496" title="496">496</a>)</li>
    <li><a href="/wiki/Isidore_of_Alexandria" title="Isidore of Alexandria">Isidore</a>, <a href="/wiki/Neoplatonism" title="Neoplatonism">Neoplatonist</a> philosopher (approximate date)</li>
    <li><a href="/wiki/Pope_Hormisdas" title="Pope Hormisdas">Pope Hormisdas</a> (approximate date)</li>
    <li><a href="/wiki/Thrasamund" title="Thrasamund">Thrasamund</a>, king of the Vandals (d. <a href="/wiki/523" title="523">523</a>)</li></ul>
    `
    const result = extract_people_from_html(mockData)

    expect(result).toEqual([
      {
        death: 527,
        desc: 'February 2 – Justin I, Byzantine Emperor (d. 527)',
        link: '/wiki/Justin_I',
      },
      {
        death: undefined,
        desc: 'Ariadne, Byzantine Empress (approximate date)',
        link: '/wiki/Ariadne_(empress)',
      },
      {
        death: 518,
        desc: 'Avitus, archbishop of Vienne (approximate date) (d. 518)',
        link: '/wiki/Avitus_of_Vienne',
      },
      {
        death: undefined,
        desc: 'Chilperic II, king of Burgundy (approximate date)',
        link: '/wiki/Chilperic_II_of_Burgundy',
      },
      {
        death: 496,
        desc: 'Gunthamund, king of the Vandals (d. 496)',
        link: '/wiki/Gunthamund',
      },
      {
        death: undefined,
        desc: 'Isidore, Neoplatonist philosopher (approximate date)',
        link: '/wiki/Isidore_of_Alexandria',
      },
      {
        death: undefined,
        desc: 'Pope Hormisdas (approximate date)',
        link: '/wiki/Pope_Hormisdas',
      },
      {
        death: 523,
        desc: 'Thrasamund, king of the Vandals (d. 523)',
        link: '/wiki/Thrasamund',
      },
    ])
  })
})

describe('extract_people_from_874', () => {
  it('should extract people from the HTML', () => {
    const mockData = `
    <h2><span class="mw-headline" id="Births">Births</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=AD_874&amp;action=edit&amp;section=10" title="Edit section: Births"><span>edit</span></a><span class="mw-editsection-bracket">]</span></span></h2>
    <ul><li>May 10 – <a href="/wiki/Meng_Zhixiang" title="Meng Zhixiang">Meng Zhixiang</a>, general of <a href="/wiki/Later_Tang" title="Later Tang">Later Tang</a> (d. 934)</li>
    <li><a href="/wiki/Abu_al-Hasan_al-Ash%27ari" title="Abu al-Hasan al-Ash'ari">Abu al-Hasan al-Ash'ari</a>, Muslim scholar (d. 936)</li>
    <li><a href="/wiki/Edward_the_Elder" title="Edward the Elder">Edward the Elder</a>, king of <a href="/wiki/Wessex" title="Wessex">Wessex</a> (approximate date)</li>
    <li><a href="/wiki/Constantine_II_of_Scotland" title="Constantine II of Scotland">Constantine II</a>, king of <a href="/wiki/Kingdom_of_Scotland" title="Kingdom of Scotland">Scotland</a> (approximate date)</li>
    <li><a href="/wiki/Liu_Yin_(Southern_Han)" title="Liu Yin (Southern Han)">Liu Yin</a>, governor (<i><a href="/wiki/Jiedushi" title="Jiedushi">jiedushi</a></i>) of <a href="/wiki/Southern_Han" title="Southern Han">Southern Han</a> (d. <a href="/wiki/AD_911" title="AD 911">911</a>)</li>
    <li><a href="/wiki/Lothar_II,_Count_of_Stade" title="Lothar II, Count of Stade">Lothar II</a>, Frankish <a href="/wiki/Nobility" title="Nobility">nobleman</a> (d. 929)</li>
    <li><a href="/wiki/Ota_(wife_of_Arnulf_of_Carinthia)" title="Ota (wife of Arnulf of Carinthia)">Ota</a>, Frankish queen and <a href="/wiki/List_of_Holy_Roman_Empresses" class="mw-redirect" title="List of Holy Roman Empresses">Holy Roman Empress</a> (approximate date)</li>
    <li><a href="/wiki/Wang_Shifan" title="Wang Shifan">Wang Shifan</a>, Chinese <a href="/wiki/Warlord" title="Warlord">warlord</a> (d. 908)</li></ul>
    `
    const result = extract_people_from_html(mockData)

    expect(result).toEqual([
      {
        death: 934,
        desc: 'May 10 – Meng Zhixiang, general of Later Tang (d. 934)',
        link: '/wiki/Meng_Zhixiang',
      },
      {
        death: 936,
        desc: 'Abu al-Hasan al-Ash\'ari, Muslim scholar (d. 936)',
        link: '/wiki/Abu_al-Hasan_al-Ash\'ari',
      },
      {
        death: undefined,
        desc: 'Edward the Elder, king of Wessex (approximate date)',
        link: '/wiki/Edward_the_Elder',
      },
      {
        death: undefined,
        desc: 'Constantine II, king of Scotland (approximate date)',
        link: '/wiki/Constantine_II_of_Scotland',
      },
      {
        death: 911,
        desc: 'Liu Yin, governor (jiedushi) of Southern Han (d. 911)',
        link: '/wiki/Liu_Yin_(Southern_Han)',
      },
      {
        death: 929,
        desc: 'Lothar II, Frankish nobleman (d. 929)',
        link: '/wiki/Lothar_II,_Count_of_Stade',
      },
      {
        death: undefined,
        desc: 'Ota, Frankish queen and Holy Roman Empress (approximate date)',
        link: '/wiki/Ota_(wife_of_Arnulf_of_Carinthia)',
      },
      {
        death: 908,
        desc: 'Wang Shifan, Chinese warlord (d. 908)',
        link: '/wiki/Wang_Shifan',
      },
    ])
  })
})
