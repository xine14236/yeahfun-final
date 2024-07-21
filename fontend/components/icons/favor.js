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
        // className={`favor ${fav ? 'favor-active' : ''}`}
        className="favor"
        // onMouseEnter={() => setIsFavor(true)}
        // onMouseLeave={() => setIsFavor(false)}
        onClick={handler}
        onKeyDown={toggleFavor}
        role="button"
        tabIndex={0}
      >
        <MdStars size={30} />
      </div>
      <style jsx>{`
        .favor {
          color: #feaf18;
        }
      `}</style>
    </>
  )
}
