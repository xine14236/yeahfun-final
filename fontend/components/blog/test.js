import React, { useState } from 'react'
import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css'

export default function MyComponent() {
  const [value, setValue] = useState('')

  // theme="bubble"
  return <ReactQuill theme="snow" value={value} onChange={setValue} />
}
