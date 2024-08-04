import { useEffect, useState } from 'react'
import { mock_list } from './list'
import { wikipedia_link_of_page, wikipedia_link_of_year } from './utils'

function App() {
  const [list, setList] = useState<{ from: number, to: number, person: { desc: string, link: string | undefined, death: number | undefined }, other_people: { desc: string, link: string | undefined, death: number | undefined }[] }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // const data = await build_list(100, 800)
      const data = await mock_list(100, 1000)
      setList(data)
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <div className="scroll-side">
        <ul>
          <table>
            {list.map((item, _index) => (
              <tr key={item.from}>
                <th>
                  <a href={wikipedia_link_of_year(item.from)}>{item.from}</a>
                </th>
                <th>
                  {item.person.link !== undefined && (
                    <a href={wikipedia_link_of_page(item.person.link)}>{item.person.desc}</a>
                  )}
                </th>
              </tr>
            ))}
          </table>
        </ul>
      </div>

      <div className="header">

      </div>

      <div className="main">

      </div>

      <div className="aside">

      </div>

      <div className="footer">

      </div>
    </div>

  )
}

export default App
