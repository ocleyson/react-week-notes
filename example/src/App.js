import React from 'react'

import { ReactWeekNotes } from 'react-week-notes'
import 'react-week-notes/dist/index.css'

const App = () => {
  return <ReactWeekNotes notes={[{name: 'ingles', time: new Date(), day: 0}]} color="#0747a6" />
}

export default App
