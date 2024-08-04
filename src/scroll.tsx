import React, { useEffect, useState } from 'react'

function MyComponent() {
  const [currentPicIndex, setCurrentPicIndex] = useState(0)

  const handleScroll = () => {
    // Implementation depends on how you're rendering rows
    // and calculating the current row
    const currentRow = Math.floor(window.scrollY / rowHeight)
    setCurrentPicIndex(Math.floor(currentRow / 100))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex">
      <div className="flex-1 overflow-auto">
        {/* Your scrollable table component */}
      </div>
      <div className="sticky top-0 flex-1 flex items-center justify-center h-screen">
        <img src={images[currentPicIndex]} alt="Displayed" />
      </div>
    </div>
  )
}
