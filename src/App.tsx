import { useEffect, useRef, useState } from 'react'
import { mock_list } from './list'
import { wikipedia_link_of_page, wikipedia_link_of_year } from './utils'

function App() {
  const [list, setList] = useState<{ from: number, to: number, person: { desc: string, link: string | undefined, death: number | undefined }, other_people: { desc: string, link: string | undefined, death: number | undefined }[] }[]>([])

  // const [currentIndex, setCurrentIndex] = useState(0)
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

  const handleScrollDebug: React.UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 1000,
    )
    setCurrentTimelineHighlight(position)
  }

  return (
    <div className="gallery">
      <div className="progress-bar" onScroll={handleScrollDebug}>
        vertical timeline
        <table>
          <tbody>
            {Array.from({ length: 1000 }).map((_, index) => (
              <tr key={index}>
                <td>
                  Row
                  {index === currentTimelineHighlight ? 99999 : index}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-detail">
        {/* <h1>{list[currentIndex].person.desc}</h1> */}
        <p>description</p>
      </div>

      <div className="photo">
        some image
      </div>
    </div>

  )
}

export default App
