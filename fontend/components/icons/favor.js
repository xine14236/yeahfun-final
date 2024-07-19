import React, { useState } from 'react'
import { MdStars } from 'react-icons/md'

export default function Favor({ size, color, className }) {
  const [isFavor, setIsFavor] = useState(false)

  const toggleFavor = () => {
    setIsFavor(!isFavor)
  }

  return (
    <>
      <div
        className={`favor ${isFavor ? 'favor-active' : ''}`}
        onMouseEnter={() => setIsFavor(true)}
        onMouseLeave={() => setIsFavor(false)}
        onClick={toggleFavor}
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
        .favor-active {
          background-color: #feaf18;
          color: #fefcf0;
          border-radius: 50%;
        }
      `}</style>
    </>
  )
}