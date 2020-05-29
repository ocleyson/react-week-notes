import React, { useEffect, useState } from 'react'
import styles from './styles.css'

interface INote {
  name: string
  time: Date
  day: number
}

interface IProps {
  color?: string
  notes: INote[]
}

interface IReducedNote {
  time: Date
  notes: INote[]
}

const week = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const today = new Date().getDay()

export const ReactWeekNotes = ({ color, notes }: IProps) => {
  const [allNotes, setAllNotes] = useState<IReducedNote[]>([])

  useEffect(() => {
    var reducedNotes = notes.reduce((allNotes: Array<any>, note: INote) => {
      if (allNotes.some((item) => item.time.getTime() === note.time.getTime()))
        return allNotes

      var notesFilteredByDate = notes.filter((item: INote) => {
        return item.time.getTime() === note.time.getTime()
      })

      allNotes.push({
        time: note.time,
        notes: notesFilteredByDate
      })

      return allNotes
    }, [])

    var reducedNotesSortedByDate = reducedNotes.sort((a, b) => a.time - b.time)

    setAllNotes(reducedNotesSortedByDate)
  }, [])

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
                <td className={styles.tabledata}>{`${item.time.getHours()}:${
                  (item.time.getMinutes() < 10 ? '0' : '') +
                  item.time.getMinutes()
                }`}</td>
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
