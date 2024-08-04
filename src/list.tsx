import { fetch_people_in } from './fetch'

export async function build_list(start_year: number, end_year: number) {
  const list = []
  let year = start_year
  const born_of_last_person = start_year

  while (year <= end_year) {
    const people_born = await fetch_people_in(year)
    const people_next = people_born.filter(person => person.death !== undefined)

    // go back 1 year if this loop cannot continue
    if (people_next.length < 1) {
      year -= 1
      if (year <= born_of_last_person)
        break
      continue
    }

    // fetch random person from people_next
    const random_person = people_next[Math.floor(Math.random() * people_next.length)]

    list.push({
      from: year,
      to: random_person.death!,
      person: random_person,
      other_people: people_born,
    })

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
