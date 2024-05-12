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
