import { useState, useEffect } from 'react'
import Favor from './favor'
import FavorActive from './favor-active'

export default function FavStoreBtn2({
  initFull = false,
  handler = () => {},
  color = '#feaf18',
  width,
}) {
  const [full, setFull] = useState(initFull)

  useEffect(() => {
    setFull(initFull)
  }, [initFull])

  return (
    <span
      style={{ color: color, cursor: 'pointer' }}
      onClick={handler}
      onKeyDown={(e) => {
        e.preventDefault()
      }}
      role="button"
      tabIndex="0"
    >
      {full ? <FavorActive width={width} /> : <Favor width={width} />}
    </span>
  )
}
