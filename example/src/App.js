import React from 'react'

import { ReactWeekNotes } from 'react-week-notes'
import 'react-week-notes/dist/index.css'

const App = () => {
  return <ReactWeekNotes notes={[{name: 'ingles', time: new Date(), day: 0}, {name: 'portugues', time: new Date(), day: 1}, {name: 'matematica', time: new Date(), day: 3}, {name: 'matematica', time: new Date(), day: 3} ]} color="#6baade" />
}

export default App
