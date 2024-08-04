import { useEffect, useRef, useState } from 'react'
import { mock_list } from './list'
import { wikipedia_link_of_page, wikipedia_link_of_year } from './utils'

function App() {
  const [list, setList] = useState<{ from: number, to: number, person: { desc: string, link: string | undefined, death: number | undefined }, other_people: { desc: string, link: string | undefined, death: number | undefined }[] }[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTimelineHighlight, setCurrentTimelineHighlight] = useState(0)

  // prepare (mock) data
  useEffect(() => {
    const fetchData = async () => {
      // const data = await build_list(100, 800)
      const data = await mock_list(100, 1000)
      setList(data)
    }

    fetchData()
  }, [])

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 1000,
    )
    setCurrentTimelineHighlight(position)

    if (position > list[currentIndex].to && currentIndex < list.length - 1)
      setCurrentIndex(currentIndex + 1)
    else if (position < list[currentIndex].from && currentIndex > 0)
      setCurrentIndex(currentIndex - 1)
  }

  return (
    <div className="gallery">
      <div className="timeline" onScroll={handleScroll}>
        Timeline
        <table>
          <tbody>
            {Array.from({ length: 1000 }).map((_, index) => (
              <tr key={index} className={currentTimelineHighlight === index ? 'highlight' : ''}>
                <td>
                  Year
                  {' '}
                  {index }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-detail">
        <h1>{ list.length === 0 ? 'loading...' : list[currentIndex].person.desc}</h1>
        <p>description</p>
      </div>

      <div className="photo">
        some image
      </div>
    </div>

  )
}

export default App
