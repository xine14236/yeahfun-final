import React, { useState, useEffect } from 'react'
import { MdStars } from 'react-icons/md'

export default function Favor({
  size,
  color,
  className,
  initFull = false,
  handler = () => {},
}) {
  const [isFavor, setIsFavor] = useState(false)
  const [fav, setFav] = useState(initFull)

  const toggleFavor = () => {
    setIsFavor(!isFavor)
  }

  useEffect(() => {
    setFav(initFull)
  }, [initFull])

  return (
    <>
      <div
        className={`favor ${fav ? 'favor-active' : ''}`}
        // onMouseEnter={() => setIsFavor(true)}
        // onMouseLeave={() => setIsFavor(false)}
        onClick={handler}
        onKeyDown={toggleFavor}
        role="button"
        tabIndex={0}
      >
        <MdStars size={size} className={className} />
      </div>
      <style jsx>{`
        .favor {
          color: #feaf18;
        }
        .favor-active {
          background-color: #feaf18;
          color: #fefcf0;
          border-radius: 50%;
        }
      `}</style>
    </>
  )
}
