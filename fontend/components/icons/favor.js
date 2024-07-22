import { useState, useEffect } from 'react'
import { MdStars } from 'react-icons/md'

// export default function Favor({
//   initFull = false,
//   handler = () => {},
//   color = '#feaf18',
//   className = '',
// }) {
//   const [full, setFull] = useState(initFull)

//   const handleToggle = () => {
//     setFull(!full)
//     handler()
//   }

//   useEffect(() => {
//     setFull(initFull)
//   }, [initFull])

//   return (
//     <>
//       <span
//         style={{ color: color, cursor: 'pointer' }}
//         className={full ? 'favor-active' : 'favor'}
//         onClick={handleToggle}
//         onKeyDown={handleToggle}
//         role="button"
//         tabIndex="0"
//       >
//         <MdStars size={30} />
//       </span>
//       <style jsx>{`
//         .favor {
//           color: #feaf18;
//         }
//         .favor-active {
//           color: black;
//         }
//       `}</style>
//     </>
//   )
// }

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
        <MdStars size={size} className={className} />
      </div>
      <style jsx>{`
        .favor {
          color: #feaf18; 
        }
      `}</style>
    </>
  )
}
