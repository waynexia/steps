function Timeline({ list, currentTimelineHighlight, handleScroll, endYear }) {
  const redundant = 3
  const table = Array.from({ length: endYear + redundant }).map((_, _index) => { return { color1: 'inactive', color2: 'inactive', should_show_year: false } })

  if (list.length === 0)
    return 'loading'

  for (let curr_index = 0; curr_index < list.length; curr_index++) {
    for (let i = list[curr_index].from; i <= list[curr_index].to; i++) {
      if (curr_index % 2 === 0) {
        table[i].color1 = 'left'
        if (table[i].color2 !== 'right')
          table[i].color2 = 'white'
      }
      else {
        table[i].color2 = 'right'
        if (table[i].color1 !== 'left')
          table[i].color1 = 'white'
      }
    }
    table[list[curr_index].from].should_show_year = true
    table[list[curr_index].to].should_show_year = true
  }
  table[0].should_show_year = true
  table[currentTimelineHighlight].color1 = 'highlight'
  table[currentTimelineHighlight].color2 = 'highlight'
  table[endYear].should_show_year = true
  for (let i = 0; i < redundant; i++) {
    table[i + endYear].color1 = 'white'
    table[i + endYear].color2 = 'white'
  }

  return (
    <div className="timeline" onScroll={handleScroll}>
      <h3 className="sticky">Timeline</h3>
      <h3> - </h3>
      <div>
        <table>
          <tbody>
            {Array.from({ length: endYear + redundant }).map((_, index) => (
              <tr key={index}>
                <td className={table[index].color1} />
                <td className={table[index].color2} />
                <td>
                  {' '}
                  {table[index].should_show_year ? index : '' }
                  {' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Timeline
