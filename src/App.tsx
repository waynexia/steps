import { useEffect, useState } from 'react'
import { build_list } from './list'

function App() {
  const [list, setList] = useState<{ from: number, to: number, person: { desc: string, link: string | undefined, death: number | undefined }, other_people: { desc: string, link: string | undefined, death: number | undefined }[] }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await build_list(100, 800)
      setList(data)
    }

    fetchData()
  }, [])

  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>
          <a href={item.link}>{item.desc}</a>
          {item.death && (
            <span>
              {' '}
              (d.
              {item.death}
              )
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default App
