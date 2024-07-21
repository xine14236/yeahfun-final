import { useState, useEffect } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa6'

export default function FavStoreBtn({
  initFull = false,
  handler = () => {},
  color = '#feaf18',
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
      {full ? <FaStar size={30} /> : <FaRegStar size={30} />}
    </span>
  )
}
