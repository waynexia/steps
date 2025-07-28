import { useCallback, useEffect, useRef, useState } from 'react'
import caster from './assets/caster.avif'
import { build_list } from './list'
import { wikipedia_link_of_page, wikipedia_link_of_year } from './utils'
import Timeline from './timeline'
import Loading from './loading'

function App() {
  const [list, setList] = useState<{ from: number, to: number, person_detail: { title: string, intro: string, imageUrl: string | null, imageTitle: string | null }, person: { desc: string, link: string | undefined, death: number | undefined }, other_people: { desc: string, link: string | undefined, death: number | undefined }[] }[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTimelineHighlight, setCurrentTimelineHighlight] = useState(0)
  // const [isUpdating, setIsUpdating] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const [warnings, setWarnings] = useState<{ id: number, message: string }[]>([])

  const isUpdateStarted = useRef(false)
  const warningIdCounter = useRef(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  const currentYear = new Date().getFullYear()

  // Warning system
  const showWarning = (message: string) => {
    const id = warningIdCounter.current++
    console.error('Warning:', message)
    setWarnings(prev => [...prev, { id, message }])

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setWarnings(prev => prev.filter(w => w.id !== id))
    }, 3000)
  }

  // prepare (mock) data
  useEffect(() => {
    const fetchData = async () => {
      if (!isUpdateStarted.current) {
        isUpdateStarted.current = true
        await build_list(1, currentYear, setList, showWarning)
        setIsFinished(true)
      }
      // const data = await mock_list(100, 1000)
      // setList(data)
      // setIsFinished(true)
    }

    fetchData()
  }, [isFinished, currentYear])

  const handleScroll = useCallback<React.UIEventHandler<HTMLDivElement>>((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement
    const position = Math.ceil(
      ((scrollTop) / (scrollHeight - clientHeight)) * currentYear,
    )
    setCurrentTimelineHighlight(Math.min(position, currentYear))

    if (position > list[currentIndex].to && currentIndex < list.length - 1) {
      setIsSwitching(true)
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setIsSwitching(false)
      }, 500)
    }
    else if (position < list[currentIndex].from && currentIndex > 0) {
      setIsSwitching(true)
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1)
        setIsSwitching(false)
      }, 500)
    }
  }, [currentYear, list, currentIndex])

  // Global wheel event handler for page-wide scrolling
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      // Check if the event target is within a scrollable area
      const target = e.target as Element
      const isInScrollableArea = target.closest('.text-detail-container')
        || target.closest('.other-people')
        || target.closest('.timeline')

      // If not in a scrollable area, handle the scroll globally
      if (!isInScrollableArea && timelineRef.current) {
        e.preventDefault()

        // Simulate scroll on timeline
        const timeline = timelineRef.current
        const scrollAmount = e.deltaY
        timeline.scrollTop += scrollAmount

        // Create a synthetic scroll event and trigger the handler
        const syntheticEvent = {
          target: {
            scrollTop: timeline.scrollTop,
            scrollHeight: timeline.scrollHeight,
            clientHeight: timeline.clientHeight,
          },
        } as unknown as React.UIEvent<HTMLDivElement>

        handleScroll(syntheticEvent)
      }
    }

    document.addEventListener('wheel', handleGlobalWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleGlobalWheel)
    }
  }, [handleScroll]) // Only depend on handleScroll

  const getNext: () => string = () => {
    if (list[currentIndex + 1] === undefined && isFinished)
      return 'finished'
    else if (list[currentIndex + 1] === undefined && !isFinished)
      return 'updating...'
    else
      return list[currentIndex + 1].person_detail.title
  }

  const getImageSidebar = () => {
    if (list.length === 0)
      return 'loading'

    return (
      <div>
        {
          list[currentIndex].person_detail.imageUrl === undefined
            ? (
              <>
                <img
                  src={caster}
                  alt="image not available"
                />
                <br />
                <div className="font-size-12px">image not available</div>
              </>
              )
            : (
              <>
                <img
                  src={list[currentIndex].person_detail.imageUrl!}
                  alt={list[currentIndex].person_detail.title}
                />
                <br />
                <div className="font-size-12px">{list[currentIndex].person_detail.imageTitle}</div>
              </>
              )
        }

        <div className="people-counter">
          {list[currentIndex].other_people.length}
          {' '}
          more well-known people were born in
          {' '}
          <a href={wikipedia_link_of_year(list[currentIndex].from)}>{list[currentIndex].from}</a>
        </div>

        <h2>Other people</h2>
        <div className="other-people">
          <ul>
            {list[currentIndex].other_people.map(person => (
              <li key={person.link || person.desc}>
                <a href={wikipedia_link_of_page(person.link!)}>{person.desc}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Warning notifications */}
      {warnings.length > 0 && (
        <div className="warnings-container">
          {warnings.map(warning => (
            <div key={warning.id} className="warning-notification">
              {warning.message}
            </div>
          ))}
        </div>
      )}

      {list.length === 0
        ? <Loading />
        : (
          <div className="gallery">
            <Timeline
              list={list}
              currentTimelineHighlight={currentTimelineHighlight}
              handleScroll={handleScroll}
              endYear={currentYear}
              ref={timelineRef}
            />

            <div className={`intro transition ${isSwitching ? 'switching' : ''}`}>
              {
            list.length === 0
              ? 'loading...'
              : (
                <>
                  <h1 className="text-center m-5px"><a href={wikipedia_link_of_page(list[currentIndex].person.link!)}>{list[currentIndex].person_detail.title}</a></h1>
                  <h2 className="text-center m-5px">{`${list[currentIndex].from} ~ ${list[currentIndex].to} (aged ${list[currentIndex].to - list[currentIndex].from})`}</h2>
                  <p className="text-center">{list[currentIndex].person.desc}</p>
                  <p className="text-detail-container">{list[currentIndex].person_detail.intro}</p>
                  <div className="preview-next">
                    <h1 className="text-center c-gray">{getNext()}</h1>
                  </div>
                </>
                )
          }
            </div>

            <div className={`photo transition ${isSwitching ? 'switching' : ''}`}>
              {getImageSidebar()}
            </div>
          </div>
          )}
    </>
  )
}

export default App
