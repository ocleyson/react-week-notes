import * as React from 'react'
import styles from './styles.module.css'

interface Notes {
  [index: number]: {
    name: string
    time: Date
    day: number
  }
}

interface Props {
  color: string
  notes: Notes
}

const week = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']

export const ReactWeekNotes = ({ color, notes }: Props) => {
  return (
    <div className={styles.test}>
      <div>
        <ul>
          {week.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
