import { fetch_people_in, person_detail } from './fetch'

export async function build_list(start_year: number, end_year: number, update_state) {
  const list = []
  let year = start_year
  const born_of_last_person = start_year

  while (year <= end_year - 30) {
    const people_born = await fetch_people_in(year)
    const people_next = people_born.filter(person => person.death !== undefined)

    // go back 1 year if this loop cannot continue
    if (people_next.length < 1) {
      year -= 1
      if (year <= born_of_last_person) {
        console.log(`failed to find next person in year ${year}`)
        break
      }
      continue
    }

    // fetch random person from people_next
    const random_person = people_next[Math.floor(Math.random() * people_next.length)]

    // fill details of this person
    const detail = await person_detail(random_person.link!)

    list.push({
      from: year,
      to: random_person.death!,
      person: random_person,
      person_detail: detail,
      other_people: people_born,
    })

    update_state(list)
    await new Promise(resolve => setTimeout(resolve, 10000))

    year = random_person.death!
  }

  return list
}

export async function mock_list(start_year: number, end_year: number) {
  const _start_year = start_year
  const _end_year = end_year
  const mock_result = [
    {
      from: 100,
      to: 170,
      person: {
        desc: 'Ptolemy, Greek astrologer, astronomer, geographer and mathematician (d. 170)',
        link: '/wiki/Ptolemy',
        death: 170,
      },
      person_detail: {
        title: 'Ptolemy',
        intro: 'Claudius Ptolemy (/ˈtɒləmi/; Greek: Πτολεμαῖος, Ptolemaios; Latin: Claudius Ptolemaeus; c. 100 – c. 170 AD)[1] was an Alexandrian mathematician, astronomer, astrologer, geographer, and music theorist[2] who wrote about a dozen scientific treatises, three of which were important to later Byzantine, Islamic, and Western European science. The first was his astronomical treatise now known as the Almagest, originally entitled Mathematical Treatise (Greek: Μαθηματικὴ Σύνταξις, Mathēmatikḗ Syntaxis). The second is the Geography, which is a thorough discussion on maps and the geographic knowledge of the Greco-Roman world. The third is the astrological treatise in which he attempted to adapt horoscopic astrology to the Aristotelian natural philosophy of his day. This is sometimes known as the Apotelesmatika (Greek: Αποτελεσματικά, lit. \'On the Effects\') but more commonly known as the Tetrábiblos, from the Koine Greek meaning "Four Books", or by its Latin equivalent Quadripartite. The Catholic Church promoted his work, which included the only mathematically sound geocentric model of the Solar System, and unlike most Greek mathematicians, Ptolemy\'s writings (foremost the Almagest) never ceased to be copied or commented upon, both in late antiquity and in the Middle Ages.[3] However, it is likely that only a few truly mastered the mathematics necessary to understand his works, as evidenced particularly by the many abridged and watered-down introductions to Ptolemy\'s astronomy that were popular among the Arabs and Byzantines.[4][5] His work on epicycles has come to symbolize a very complex theoretical model built in order to explain a false assumption.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ptolemy_1476_with_armillary_sphere_model.jpg/440px-Ptolemy_1476_with_armillary_sphere_model.jpg',
        imageTitle: 'Portrait of Ptolemy by Justus van Gent and Pedro Berruguete (1476)',
      },
      other_people: [
        {
          desc: 'Fa Zhen (or Gaoqing), Chinese scholar (d. 188)',
          link: '/wiki/Fa_Zhen',
          death: 188,
        },
        {
          desc: 'Faustina the Elder, Roman empress',
          link: '/wiki/Faustina_the_Elder',
        },
        {
          desc: 'Justin Martyr, Christian apologist and saint (approximate date)',
          link: '/wiki/Justin_Martyr',
        },
        {
          desc: 'Marcus Cornelius Fronto, Roman grammarian, rhetorician and advocate (d. 170)',
          link: '/wiki/Marcus_Cornelius_Fronto',
          death: 170,
        },
        {
          desc: 'Ptolemy, Greek astrologer, astronomer, geographer and mathematician (d. 170)',
          link: '/wiki/Ptolemy',
          death: 170,
        },
        {
          desc: 'Quintus Junius Rusticus, Roman teacher and politician (approximate date)',
          link: '/wiki/Junius_Rusticus',
        },
        {
          desc: 'Quintus Tineius Sacerdos Clemens, Roman politician (approximate date)',
          link: '/wiki/Quintus_Tineius_Sacerdos_Clemens',
        },
      ],
    },
    {
      from: 670,
      to: 704,
      person: {
        desc: 'Tridu Songtsen, emperor of Tibet (d. 704)',
        link: '/wiki/Tridu_Songtsen',
        death: 704,
      },
      person_detail: {
        title: 'Tridu Songtsen',
        intro: 'some intro',
        imageUrl: undefined,
        imageTitle: undefined,
      },
      other_people: [
        {
          desc: 'Bertrada of Prüm, Merovingian princess (approximate date)',
          link: '/wiki/Bertrada_of_Pr%C3%BCm',
        },
        {
          desc: 'Childebert III, king of the Franks (approximate date)',
          link: '/wiki/Childebert_III',
        },
        {
          desc: 'Corbinian, Frankish bishop (approximate date)',
          link: '/wiki/Corbinian',
        },
        {
          desc: 'Drogo, Carolingian duke of Champagne (d. 708)',
          link: '/wiki/Drogo_of_Champagne',
          death: 708,
        },
        {
          desc: 'Petronax, Italian monk and abbot (approximate date)',
          link: '/wiki/Petronax_of_Monte_Cassino',
        },
        {
          desc: 'Smbat VI, Armenian prince (approximate date)',
          link: '/wiki/Smbat_VI_Bagratuni',
        },
        {
          desc: 'Tariq ibn Ziyad, Muslim general (d. 720)',
          link: '/wiki/Tariq_ibn_Ziyad',
          death: 720,
        },
        {
          desc: 'Tatwine, archbishop of Canterbury (approximate date)',
          link: '/wiki/Tatwine',
        },
        {
          desc: 'Tridu Songtsen, emperor of Tibet (d. 704)',
          link: '/wiki/Tridu_Songtsen',
          death: 704,
        },
        {
          desc: 'Wihtred, king of Kent (approximate date)',
          link: '/wiki/Wihtred_of_Kent',
        },
      ],
    },
  ]
  return mock_result
}
