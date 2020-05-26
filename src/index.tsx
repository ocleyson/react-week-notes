import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

interface Notes {
  name: string
  time: Date
  day: number
}

interface Props {
  color?: string
  notes: Notes[]
}

interface ReducedNote {
  time: Date
  notes: Notes[]
  numberOfColums: number
}

const week = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const today = new Date().getDay()

export const ReactWeekNotes = ({ color, notes }: Props) => {
  const [allNotes, setAllNotes] = useState<ReducedNote[]>([])

  useEffect(() => {
    var reducedNotes = notes.reduce((allNotes: Array<any>, note: Notes) => {
      if (allNotes.some((item) => item.time.getTime() === note.time.getTime()))
        return allNotes

      var notesFilteredByDate = notes.filter((item: Notes) => {
        return item.time.getTime() === note.time.getTime()
      })

      var numberOfColums = getNumberOfColums(notesFilteredByDate)

      allNotes.push({
        time: note.time,
        notes: notesFilteredByDate,
        numberOfColums
      })

      return allNotes
    }, [])

    var reducedNotesSortedByDate = reducedNotes.sort((a, b) => a.time - b.time)

    setAllNotes(reducedNotesSortedByDate)
  }, [])

  function getNumberOfColums(notes: any) {
    var number = 0

    for (var i = 0; i <= week.length; i++) {
      var numberOfCols = notes.filter((item: Notes) => item.day === i).length

      if (number < numberOfCols) {
        number = numberOfCols
      }
    }

    return number
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Horários</th>
            {week.map((day, index) => (
              <th
                key={index}
                style={{ backgroundColor: today === index ? color : '#FFF' }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allNotes.map((item: ReducedNote, index: number) => {
            return (
              <tr key={index}>
                <td rowSpan={item.numberOfColums}>{`${item.time.getHours()}:${
                  (item.time.getMinutes() < 10 ? '0' : '') +
                  item.time.getMinutes()
                }`}</td>
                {week.map((_, dayIndex: number) => {
                  var numberOfNotesPerDay = item.notes.filter(
                    (note: Notes) => note.day === dayIndex
                  )

                  if (numberOfNotesPerDay.length === 1) {
                    return <td key={dayIndex}>{numberOfNotesPerDay[0].name}</td>
                  } else if (numberOfNotesPerDay.length >= 2) {
                    return (
                      <td key={dayIndex}>
                        <table>
                          <tbody>
                            {numberOfNotesPerDay.map((z: any, i: any) => (
                              <tr key={i}>
                                <td>{z.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    )
                  } else {
                    return <td key={dayIndex}>{null}</td>
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
