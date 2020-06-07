import React, { useEffect, useState } from 'react'
import styles from './styles.css'

interface INote {
  name: string
  time: string
  day: number
}

interface IProps {
  color?: string
  notes: INote[]
}

interface IReducedNote {
  time: string
  notes: INote[]
}

const week = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const today = new Date().getDay()

export const ReactWeekNotes = ({ color, notes }: IProps) => {
  const [allNotes, setAllNotes] = useState<IReducedNote[]>([])

  useEffect(() => {
    handleErrors()
    handleData()
  }, [])

  function handleErrors() {
    if (notes.some((note) => note.day < 0 || note.day > 6))
      throw new Error('Days are bad formatted.')

    if (notes.some((note) => typeof note.name !== 'string'))
      throw new Error('Note name have to be a string.')

    if (
      notes.some((note) => !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(note.time))
    )
      throw new Error('Time is bad formatted.')
  }

  function handleData() {
    var reducedNotes = notes.reduce((allNotes: Array<any>, note: INote) => {
      if (allNotes.some((item) => item.time === note.time)) return allNotes

      var notesFilteredByDate = notes.filter((item: INote) => {
        return item.time === note.time
      })

      allNotes.push({
        time: note.time,
        notes: notesFilteredByDate
      })

      return allNotes
    }, [])

    var reducedNotesSortedByDate = reducedNotes.sort((a, b) => {
      if (a.time < b.time) return -1
      if (a.time > b.time) return 1
      return 0
    })

    setAllNotes(reducedNotesSortedByDate)
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tabledata}>Horários</th>
            {week.map((day, index) => (
              <th
                key={index}
                style={{ backgroundColor: today === index ? color : '#FFF' }}
                className={styles.tabledata}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allNotes.map((item: IReducedNote, index: number) => {
            return (
              <tr key={index}>
                <td className={styles.tabledata}>{item.time}</td>
                {week.map((_, dayIndex: number) => {
                  var notesPerDay = item.notes.filter(
                    (note: INote) => note.day === dayIndex
                  )

                  if (notesPerDay.length === 1) {
                    return (
                      <td className={styles.tabledata} key={dayIndex}>
                        {notesPerDay[0].name}
                      </td>
                    )
                  } else if (notesPerDay.length >= 2) {
                    return (
                      <td className={styles.tabledata} key={dayIndex}>
                        <table>
                          <tbody>
                            {notesPerDay.map((note: INote, index: number) => (
                              <tr key={index}>
                                <td>{note.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    )
                  } else {
                    return (
                      <td className={styles.tabledata} key={dayIndex}>
                        {null}
                      </td>
                    )
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
