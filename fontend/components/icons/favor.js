import { MdStars } from 'react-icons/md'

export default function Favor() {
  return (
    <>
      <div className="favor" role="button" tabIndex={0}>
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
