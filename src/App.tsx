import { useEffect, useRef, useState } from 'react'
import { build_list, mock_list } from './list'
import { person_detail } from './fetch'
import { wikipedia_link_of_page } from './utils'

function App() {
  const [list, setList] = useState<{ from: number, to: number, person_detail: { title: string, intro: string, imageUrl: string | null, imageTitle: string | null }, person: { desc: string, link: string | undefined, death: number | undefined }, other_people: { desc: string, link: string | undefined, death: number | undefined }[] }[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTimelineHighlight, setCurrentTimelineHighlight] = useState(0)

  // prepare (mock) data
  useEffect(() => {
    const fetchData = async () => {
      const data = await build_list(100, 200)
      // const data = await mock_list(100, 1000)
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
              <tr key={index}>
                <td className={`indicator ${currentTimelineHighlight === index ? 'highlight' : ''}`} />
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

      <div className="intro">
        {
          list.length === 0
            ? 'loading...'
            : (
              <>
                <h1><a href={wikipedia_link_of_page(list[currentIndex].person.link!)}>{list[currentIndex].person_detail.title}</a></h1>
                <h2>{ `${list[currentIndex].from} ~ ${list[currentIndex].to}`}</h2>
                <p className="text-detail-container">{ list[currentIndex].person_detail.intro}</p>
              </>
              )
        }
      </div>

      <div className="photo">
        {
          list.length === 0 || list[currentIndex].person_detail.imageUrl === undefined
            ? 'some image'
            : (
              <div className="image-container">
                <img
                  src={list[currentIndex].person_detail.imageUrl!}
                  alt={list[currentIndex].person_detail.title}
                />
                <br />
                {list[currentIndex].person_detail.imageTitle}
              </div>
              )
        }
      </div>
    </div>

  )
}

export default App
