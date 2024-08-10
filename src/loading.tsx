function Loading() {
  return (
    <div className="flex h-100vh w-100vw justify-center align-items-center">
      <span className="loading-spin"></span>
      <div className="w-10" />
      <div>
        <h1 className="m-t-0">Loading...</h1>
        <p className="m-1">It may take a while to load data from wikipedia.org</p>
        <p className="m-1">Tips: scroll the timeline on the left side</p>
      </div>
      <script
        data-goatcounter="https://waynest.goatcounter.com/count"
        data-goatcounter-settings='{"path": "/steps"}'
        async
        src="//gc.zgo.at/count.js"
      >
      </script>
    </div>
  )
}

export default Loading
