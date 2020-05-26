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

const week = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const today = new Date().getDay()

export const ReactWeekNotes = ({ color, notes }: Props) => {
  const [allNotes, setAllNotes] = useState<any>([])

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
          {allNotes.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td rowSpan={item.numberOfColums}>{`${item.time.getHours()}:${
                  (item.time.getMinutes() < 10 ? '0' : '') +
                  item.time.getMinutes()
                }`}</td>
                {week.map((_, noteIndex: number) => {
                  var testNumber = item.notes.filter(
                    (n: Notes) => n.day === noteIndex
                  )

                  if (testNumber.length === 1) {
                    return <td key={noteIndex}>{testNumber[0].name}</td>
                  } else if (testNumber.length >= 2) {
                    return (
                      <td key={noteIndex}>
                        <table>
                          <tbody>
                            {testNumber.map((z: any, i: any) => (
                              <tr key={i}>
                                <td>{z.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    )
                  } else {
                    return <td key={noteIndex}>{null}</td>
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
