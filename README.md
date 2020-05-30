# react-week-notes

> A lib to make week notes.

[![NPM](https://img.shields.io/npm/v/react-week-notes.svg)](https://www.npmjs.com/package/react-week-notes) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-week-notes
```

## Usage

```tsx
import React from 'react'

import { ReactWeekNotes } from 'react-week-notes'
import 'react-week-notes/dist/index.css'

const notes = [
    {name: 'Homework', time: new Date(), day: 1}, 
]

const Example = () => {
    return <ReactWeekNotes notes={notes} color="#6baade" />
}
```

## License

MIT © [cleysonLA](https://github.com/cleysonLA)
