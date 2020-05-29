import React from 'react'

import { ReactWeekNotes } from 'react-week-notes'
import 'react-week-notes/dist/index.css'

const notes = [
    {name: 'Homework', time: new Date(), day: 1}, 
]

const App = () => {
    return (
        <div style={{ margin: '2em' }}>
            <ReactWeekNotes notes={notes} color="#6baade" />
        </div>
    )
}

export default App
